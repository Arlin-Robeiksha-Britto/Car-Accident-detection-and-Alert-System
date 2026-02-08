"""
T. Nagar 24x7 Emergency Services
- Loads T. Nagar hospitals (24x7 general care) and police datasets
- Assigns best-performing hospital by: emergency capability, proximity, response time,
  ICU availability, and past performance ratings
- Provides phone list for automated emergency call to hospital + police.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent
T_NAGAR_HOSPITALS = ROOT / "t_nagar_24x7_general_hospitals.csv"
T_NAGAR_POLICE = ROOT / "t_nagar_police.csv"
T_NAGAR_COMBINED = ROOT / "t_nagar_emergency_dataset.csv"


def load_t_nagar_combined() -> pd.DataFrame:
    """Load combined T. Nagar 24x7 hospitals and police dataset."""
    if T_NAGAR_COMBINED.exists():
        df = pd.read_csv(T_NAGAR_COMBINED)
        df["Emergency_24x7"] = df.get("Emergency_24x7", "Y").fillna("Y").str.upper()
        return df
    # Fallback: build from two CSVs
    hospitals = pd.read_csv(T_NAGAR_HOSPITALS)
    hospitals["Category"] = "Hospital"
    hospitals["Name"] = hospitals["Hospital_Name"]
    hospitals["Emergency_24x7"] = "Y"
    hospitals["ICU_availability"] = "Y"  # assume yes for 24x7 general care
    hospitals["Response_readiness"] = "high"
    hospitals["Address"] = "T Nagar Chennai"
    police = pd.read_csv(T_NAGAR_POLICE)
    police["Category"] = "Police Station"
    police["Emergency_24x7"] = "Y"
    police["Address"] = ""
    police["ICU_availability"] = ""
    police["Response_readiness"] = "high"
    cols = [
        "Category",
        "Name",
        "Address",
        "Latitude",
        "Longitude",
        "Phone",
        "Emergency_24x7",
        "ICU_availability",
        "Response_readiness",
    ]
    for c in cols:
        if c not in hospitals.columns:
            hospitals[c] = ""
        if c not in police.columns:
            police[c] = ""
    combined = pd.concat([hospitals[cols], police[cols]], ignore_index=True)
    return combined


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    import math

    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def get_24x7_hospitals_and_police(
    accident_lat: float,
    accident_lon: float,
    max_radius_km: float = 15.0,
) -> tuple[list[dict], list[dict]]:
    """Get 24x7 hospitals and police stations near accident location. Returns (list of hospital dicts, list of police
    dicts) sorted by distance.
    """
    df = load_t_nagar_combined()
    df = df[df.get("Emergency_24x7", "Y").astype(str).str.upper() == "Y"]
    df["Distance_km"] = df.apply(
        lambda r: haversine_km(accident_lat, accident_lon, float(r["Latitude"]), float(r["Longitude"])), axis=1
    )
    df = df[df["Distance_km"] <= max_radius_km].sort_values("Distance_km")
    hospitals = df[df["Category"].str.contains("Hospital", case=False, na=False)]
    police = df[df["Category"].str.contains("Police", case=False, na=False)]

    def to_dict(r):
        return {
            "name": r.get("Name", ""),
            "category": r.get("Category", ""),
            "lat": float(r["Latitude"]),
            "lon": float(r["Longitude"]),
            "phone": str(r.get("Phone", "")).strip() if pd.notna(r.get("Phone")) else "",
            "distance_km": round(r["Distance_km"], 2),
            "emergency_24x7": str(r.get("Emergency_24x7", "Y")).upper() == "Y",
            "icu_availability": str(r.get("ICU_availability", "")).upper() == "Y",
            "response_readiness": r.get("Response_readiness", "medium"),
        }

    return [to_dict(r) for _, r in hospitals.iterrows()], [to_dict(r) for _, r in police.iterrows()]


def assign_best_hospital(
    accident_lat: float,
    accident_lon: float,
    rating_system=None,
    max_radius_km: float = 15.0,
) -> dict | None:
    """Assign best-performing hospital based on: emergency capability (24x7), proximity, response time (est. from
    distance), ICU availability, and past performance ratings.
    """
    hospitals, _ = get_24x7_hospitals_and_police(accident_lat, accident_lon, max_radius_km)
    if not hospitals:
        return None

    def score(h):
        # Proximity (closer = better): max 40 points
        dist = h["distance_km"]
        proximity_score = max(0, 40 - dist * 4)
        # ICU: 20 points if available
        icu_score = 20 if h.get("icu_availability") else 0
        # Response readiness: high=15, medium=10, low=5
        readiness = h.get("response_readiness", "medium")
        readiness_score = {"high": 15, "medium": 10, "low": 5}.get(readiness, 10)
        # Past performance rating (0-5 -> 0-25)
        rating = 2.5
        if rating_system:
            try:
                info = rating_system.get_hospital_rating(h["name"])
                if info:
                    rating = info.get("current_rating", 2.5)
            except Exception:
                pass
        rating_score = (rating / 5.0) * 25
        total = proximity_score + icu_score + readiness_score + rating_score
        return total

    best = max(hospitals, key=score)
    return best


def get_emergency_call_list(
    accident_lat: float,
    accident_lon: float,
    include_best_hospital: bool = True,
    include_nearest_police: bool = True,
    max_police: int = 2,
    rating_system=None,
) -> list[dict]:
    """Get ordered list of contacts for automated emergency call: 24x7 general care hospitals and emergency services
    (police). Returns list of {"name", "phone", "category"} with valid phone numbers.
    """
    hospitals, police = get_24x7_hospitals_and_police(accident_lat, accident_lon)
    out = []
    if include_best_hospital and hospitals:
        best = assign_best_hospital(accident_lat, accident_lon, rating_system=rating_system)
        if best and best.get("phone"):
            out.append({"name": best["name"], "phone": best["phone"], "category": "Hospital"})
    for p in police[:max_police]:
        if p.get("phone"):
            out.append({"name": p["name"], "phone": p["phone"], "category": "Police Station"})
    return out
