"""
Integrated Emergency Response System
Combines route finding, hospital rating, and map generation
Works with existing alert system.
"""

from __future__ import annotations

import json
import os
from datetime import datetime

from emergency_map_generator import EmergencyMapGenerator
from emergency_route_finder import EmergencyRouteFinder
from hospital_rating_system import HospitalRatingSystem


class EmergencyResponseSystem:
    """Main integration class for emergency response Handles accident detection response with route finding and hospital
    selection.
    """

    def __init__(self, places_dataset_path: str = "places_dataset.csv", use_t_nagar_24x7: bool = False):
        self.use_t_nagar_24x7 = use_t_nagar_24x7
        if use_t_nagar_24x7:
            import os

            t_nagar_path = os.path.join(os.path.dirname(__file__), "t_nagar_emergency_dataset.csv")
            self.dataset_path = t_nagar_path if os.path.exists(t_nagar_path) else places_dataset_path
        else:
            self.dataset_path = places_dataset_path
        self.route_finder = EmergencyRouteFinder(self.dataset_path)
        self.rating_system = HospitalRatingSystem()
        self.map_generator = EmergencyMapGenerator(self.dataset_path)

    def handle_accident(
        self,
        accident_lat: float,
        accident_lon: float,
        accident_id: str | None = None,
        generate_map: bool = True,
        fast_mode: bool = False,
    ) -> dict:
        """Handle accident detection - find best hospital and generate route.

        Args:
            accident_lat, accident_lon: Accident location
            accident_id: Unique identifier for this accident
            generate_map: Whether to generate HTML map

        Returns:
            Dictionary with response information
        """
        if not accident_id:
            accident_id = f"accident_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        # Find nearest hospitals with routes (24x7 only when using T. Nagar dataset)
        print("Finding nearest hospitals...")
        hospitals = self.route_finder.find_nearest_hospitals_with_routes(
            accident_lat, accident_lon, num_hospitals=5, fast_mode=fast_mode, emergency_24x7_only=self.use_t_nagar_24x7
        )

        # Sort by route distance and filter successful routes
        hospitals_with_routes = [h for h in hospitals if h.get("route_success")]
        hospitals_with_routes.sort(key=lambda x: x.get("route_distance_km", float("inf")))

        if not hospitals_with_routes:
            return {"success": False, "error": "No hospitals with valid routes found", "accident_id": accident_id}

        # Select best hospital based on route distance and rating
        best_hospital = None
        best_score = -1

        for hospital in hospitals_with_routes[:5]:  # Consider top 5 for best assignment
            hospital_name = hospital["hospital_name"]
            rating_info = self.rating_system.get_hospital_rating(hospital_name)

            # Register hospital if not in system
            if not rating_info:
                self.rating_system.register_hospital(
                    hospital_name,
                    address=hospital.get("hospital_address", ""),
                    latitude=hospital["hospital_lat"],
                    longitude=hospital["hospital_lon"],
                    phone=hospital.get("hospital_phone", ""),
                )
                rating_info = self.rating_system.get_hospital_rating(hospital_name)

            # Score: proximity (route distance), rating, ICU/emergency readiness when available
            route_score = 1.0 / (hospital["route_distance_km"] + 0.1)
            rating_score = rating_info["current_rating"] / 5.0 if rating_info else 0.5
            # Optional: boost for ICU / response readiness from dataset (if present)
            extra = 0.0
            if self.use_t_nagar_24x7:
                try:
                    import pandas as pd

                    tdf = pd.read_csv(self.dataset_path)
                    row = tdf[tdf["Name"].astype(str).str.contains(hospital_name, case=False, na=False)]
                    if not row.empty:
                        if str(row.iloc[0].get("ICU_availability", "")).upper() == "Y":
                            extra += 0.1
                        if str(row.iloc[0].get("Response_readiness", "")).lower() == "high":
                            extra += 0.05
                except Exception:
                    pass
            combined_score = route_score * 0.55 + rating_score * 0.35 + extra

            if combined_score > best_score:
                best_score = combined_score
                best_hospital = hospital
                best_hospital["rating_info"] = rating_info

        if not best_hospital:
            best_hospital = hospitals_with_routes[0]

        # Generate map if requested
        map_path = None
        if generate_map:
            map_filename = f"emergency_route_map_{accident_id}.html"
            map_path = os.path.join("emergency_maps", map_filename)
            os.makedirs("emergency_maps", exist_ok=True)

            self.map_generator.generate_map_html(
                accident_lat=accident_lat,
                accident_lon=accident_lon,
                hospital_name=best_hospital["hospital_name"],
                hospital_lat=best_hospital["hospital_lat"],
                hospital_lon=best_hospital["hospital_lon"],
                output_file=map_path,
            )

        # Prepare response
        response = {
            "success": True,
            "accident_id": accident_id,
            "accident_location": {"latitude": accident_lat, "longitude": accident_lon},
            "selected_hospital": {
                "name": best_hospital["hospital_name"],
                "address": best_hospital.get("hospital_address", ""),
                "phone": best_hospital.get("hospital_phone", ""),
                "latitude": best_hospital["hospital_lat"],
                "longitude": best_hospital["hospital_lon"],
                "star_rating": best_hospital["rating_info"]["current_rating"]
                if best_hospital.get("rating_info")
                else 2.5,
                "total_cases": best_hospital["rating_info"].get("total_cases", 0)
                if best_hospital.get("rating_info")
                else 0,
            },
            "route": {
                "distance_km": best_hospital["route_distance_km"],
                "distance_m": best_hospital["route_distance_m"],
                "route_coordinates": best_hospital.get("route_coordinates", []),
            },
            "map_file": map_path,
            "alternative_hospitals": [
                {
                    "name": h["hospital_name"],
                    "distance_km": h["route_distance_km"],
                    "rating": self.rating_system.get_hospital_rating(h["hospital_name"])["current_rating"]
                    if self.rating_system.get_hospital_rating(h["hospital_name"])
                    else 2.5,
                }
                for h in hospitals_with_routes[1:3]  # Next 2 alternatives
            ],
            "timestamp": datetime.now().isoformat(),
        }

        # Save response to JSON file
        report_filename = f"emergency_response_{accident_id}.json"
        report_path = os.path.join("api_data", report_filename)
        os.makedirs("api_data", exist_ok=True)

        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(response, f, indent=2, ensure_ascii=False)

        return response

    def record_treatment_outcome(
        self,
        accident_id: str,
        hospital_name: str,
        patient_outcome: str,
        quality_score: float,
        response_time_minutes: float,
        treatment_notes: str = "",
    ):
        """Record treatment outcome to update hospital ratings.

        Args:
            accident_id: ID of the accident case
            hospital_name: Name of hospital that treated the patient
            patient_outcome: 'successful', 'partial', or 'unsuccessful'
            quality_score: Treatment quality (0-100)
            response_time_minutes: Time taken to respond and treat
            treatment_notes: Optional notes
        """
        return self.rating_system.record_case_outcome(
            hospital_name=hospital_name,
            accident_id=accident_id,
            patient_outcome=patient_outcome,
            quality_score=quality_score,
            response_time_minutes=response_time_minutes,
            treatment_notes=treatment_notes,
        )

    def get_hospital_performance_report(self, hospital_name: str) -> dict:
        """Get detailed performance report for a hospital."""
        return self.rating_system.get_hospital_rating(hospital_name)

    def get_top_performing_hospitals(self, limit: int = 10) -> list:
        """Get list of top-performing hospitals."""
        return self.rating_system.get_top_hospitals(limit=limit)

    def get_emergency_call_contacts(self, accident_lat: float, accident_lon: float):
        """Get ordered list of contacts for automated emergency call: best 24x7 hospital and nearest police (when using
        T. Nagar). Otherwise returns empty.
        """
        if not self.use_t_nagar_24x7:
            return []
        try:
            from t_nagar_emergency_service import get_emergency_call_list

            return get_emergency_call_list(
                accident_lat,
                accident_lon,
                include_best_hospital=True,
                include_nearest_police=True,
                max_police=2,
                rating_system=self.rating_system,
            )
        except Exception as e:
            print(f"Emergency call list error: {e}")
            return []
