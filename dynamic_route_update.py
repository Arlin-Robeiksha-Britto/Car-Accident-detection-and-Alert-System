"""
Dynamic route update when traffic conditions change.
Recomputes shortest path and regenerates Leaflet + Google map with updated route.
Call periodically or when traffic factor changes (e.g. from a future traffic API).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent


def update_route_dynamically(
    accident_lat: float,
    accident_lon: float,
    accident_id: str,
    traffic_factor: float = 1.0,
    emergency_system=None,
) -> dict:
    """Continuously update route when traffic conditions change. traffic_factor: 1.0 = normal, >1 = slower (e.g. 1.3 =
    30% slower). Returns updated response with new route and map paths.
    """
    if emergency_system is None:
        try:
            from emergency_response_system import EmergencyResponseSystem

            emergency_system = EmergencyResponseSystem(use_t_nagar_24x7=True)
        except Exception as e:
            return {"success": False, "error": str(e)}

    # Re-run handle_accident to get fresh route (fast_mode for quick update)
    response = emergency_system.handle_accident(
        accident_lat,
        accident_lon,
        accident_id=accident_id,
        generate_map=True,
        fast_mode=True,
    )
    if not response.get("success"):
        return response

    # Optionally adjust ETA by traffic_factor (stored in response for display)
    route = response.get("route", {})
    if route and traffic_factor != 1.0:
        response["route"]["traffic_factor"] = traffic_factor
        response["route"]["eta_minutes_estimated"] = (
            (route.get("distance_km", 0) / 40.0) * 60 * traffic_factor
        )  # 40 km/h base speed

    return response


def refresh_maps_for_alert(
    accident_lat: float,
    accident_lon: float,
    accident_id: str,
    traffic_factor: float = 1.0,
) -> dict:
    """Convenience: refresh both Leaflet and Google maps with current traffic."""
    return update_route_dynamically(accident_lat, accident_lon, accident_id, traffic_factor)
