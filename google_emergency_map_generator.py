"""
Google Maps Emergency Map Generator
Creates interactive HTML maps using Google Maps JavaScript API.
Shows accident location, nearest hospital, and route between them.
Uses same data interface as emergency_map_generator (no changes to other files).
"""

from __future__ import annotations

import os


class GoogleEmergencyMapGenerator:
    """Generates interactive HTML maps with Google Maps API. Set GOOGLE_MAPS_API_KEY in environment or pass api_key to
    generate_map_html().
    """

    def __init__(self, places_dataset_path: str = "places_dataset.csv"):
        self.dataset_path = places_dataset_path

    def generate_map_html(
        self,
        accident_lat: float,
        accident_lon: float,
        hospital_name: str | None = None,
        hospital_lat: float | None = None,
        hospital_lon: float | None = None,
        route_coordinates: list[dict] | None = None,
        route_distance_km: float = 0,
        star_rating: float = 2.5,
        rating_info: dict | None = None,
        output_file: str | None = None,
        api_key: str | None = None,
    ) -> str:
        """Generate interactive HTML map using Google Maps.

        Args:
            accident_lat, accident_lon: Accident location
            hospital_name, hospital_lat, hospital_lon: Hospital details
            route_coordinates: List of {"lat", "lon"} for route polyline
            route_distance_km: Route distance in km
            star_rating: Hospital star rating (0-5)
            rating_info: Optional dict with total_cases, success_rate_percent, etc.
            output_file: Optional path to save HTML file
            api_key: Google Maps JavaScript API key (or set GOOGLE_MAPS_API_KEY env)

        Returns:
            HTML content as string
        """
        api_key = api_key or os.environ.get("GOOGLE_MAPS_API_KEY", "YOUR_GOOGLE_MAPS_API_KEY")
        route_coordinates = route_coordinates or []
        rating_info = rating_info or {}

        stars_html = self._generate_star_html(star_rating)
        metrics_html = self._format_hospital_metrics(rating_info)

        # Google Maps route path (encoded or array of lat,lng)
        route_path_js = self._route_to_google_path_js(route_coordinates)
        center_lat = (accident_lat + hospital_lat) / 2 if hospital_lat and hospital_lon else accident_lat
        center_lon = (accident_lon + hospital_lon) / 2 if hospital_lat and hospital_lon else accident_lon

        hospital_name = hospital_name or "Nearest Hospital"

        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Emergency Response - Google Maps</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {{ margin: 0; padding: 0; font-family: Arial, sans-serif; }}
        #map {{ height: 100vh; width: 100%; }}
        .info-panel {{
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 350px;
            max-height: 85vh;
            overflow-y: auto;
        }}
        .info-panel h3 {{ margin-top: 0; color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; }}
        .hospital-info {{ background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }}
        .hospital-name {{ font-size: 18px; font-weight: bold; color: #1976d2; margin-bottom: 10px; }}
        .star-rating {{ font-size: 20px; color: #ffa000; margin: 10px 0; }}
        .route-info {{ background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2196f3; }}
        .accident-info {{ background: #ffebee; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #d32f2f; }}
        .metric-item {{ margin: 8px 0; display: flex; justify-content: space-between; }}
        .metric-label {{ color: #666; font-weight: 500; }}
        .metric-value {{ font-weight: bold; color: #333; }}
        .legend {{
            position: absolute;
            bottom: 30px;
            left: 10px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
        }}
        .legend-item {{ margin: 8px 0; display: flex; align-items: center; }}
        .legend-icon {{ width: 20px; height: 20px; margin-right: 10px; border-radius: 50%; border: 2px solid #333; }}
    </style>
</head>
<body>
    <div id="map"></div>
    <div class="info-panel">
        <h3>Emergency Response (Google Maps)</h3>
        <div class="hospital-info">
            <div class="hospital-name">&#x1f3e5; {hospital_name}</div>
            <div class="star-rating">Rating: {stars_html} ({star_rating:.1f}/5.0)</div>
            {metrics_html}
        </div>
        <div class="route-info">
            <h4 style="margin-top: 0;">Route</h4>
            <div class="metric-item">
                <span class="metric-label">Distance:</span>
                <span class="metric-value">{route_distance_km:.2f} km</span>
            </div>
        </div>
        <div class="accident-info">
            <h4 style="margin-top: 0;">Accident Location</h4>
            <div class="metric-item">
                <span class="metric-label">Lat:</span>
                <span class="metric-value">{accident_lat:.6f}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Lon:</span>
                <span class="metric-value">{accident_lon:.6f}</span>
            </div>
        </div>
    </div>
    <div class="legend">
        <h4 style="margin-top: 0;">Legend</h4>
        <div class="legend-item">
            <div class="legend-icon" style="background: #d32f2f;"></div>
            <span><strong>Accident</strong></span>
        </div>
        <div class="legend-item">
            <div class="legend-icon" style="background: #1976d2;"></div>
            <span>Hospital</span>
        </div>
        <div class="legend-item">
            <div style="width: 30px; height: 5px; background: #2196f3; margin-right: 10px;"></div>
            <span>Route</span>
        </div>
    </div>

    <script>
        function initMap() {{
            var center = {{ lat: {center_lat}, lng: {center_lon} }};
            var map = new google.maps.Map(document.getElementById('map'), {{
                zoom: 13,
                center: center,
                mapTypeId: 'roadmap'
            }});

            // Accident marker (red)
            var accidentMarker = new google.maps.Marker({{
                position: {{ lat: {accident_lat}, lng: {accident_lon} }},
                map: map,
                title: 'Accident Location',
                icon: {{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: '#d32f2f',
                    fillOpacity: 1,
                    strokeColor: '#8B0000',
                    strokeWeight: 3
                }}
            }});
            var accidentInfo = new google.maps.InfoWindow({{
                content: '<div style="padding:10px;"><b>ACCIDENT LOCATION</b><br>Lat: {accident_lat:.6f}<br>Lon: {accident_lon:.6f}</div>'
            }});
            accidentMarker.addListener('click', function() {{ accidentInfo.open(map, accidentMarker); }});

            // Hospital marker (blue)
            var hospitalMarker = new google.maps.Marker({{
                position: {{ lat: {hospital_lat}, lng: {hospital_lon} }},
                map: map,
                title: '{hospital_name.replace("'", "\\'")}',
                label: {{ text: 'H', color: 'white' }}
            }});
            var hospitalInfo = new google.maps.InfoWindow({{
                content: '<div style="padding:10px;"><b>HOSPITAL</b><br>{hospital_name}<br>Rating: {star_rating:.1f}/5</div>'
            }});
            hospitalMarker.addListener('click', function() {{ hospitalInfo.open(map, hospitalMarker); }});

            // Route polyline
            {route_path_js}

            // Fit bounds to show all
            var bounds = new google.maps.LatLngBounds();
            bounds.extend({{ lat: {accident_lat}, lng: {accident_lon} }});
            bounds.extend({{ lat: {hospital_lat}, lng: {hospital_lon} }});
            map.fitBounds(bounds, 50);
        }}
    </script>
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key={api_key}&callback=initMap">
    </script>
</body>
</html>"""

        if output_file:
            os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(html_content)

        return html_content

    def _generate_star_html(self, rating: float) -> str:
        full_stars = int(rating)
        half_star = 1 if (rating - full_stars) >= 0.5 else 0
        empty_stars = 5 - full_stars - half_star
        return "★" * full_stars + ("½" if half_star else "") + "☆" * empty_stars

    def _format_hospital_metrics(self, rating_info: dict) -> str:
        if not rating_info:
            return ""
        return f"""
            <div class="metric-item">
                <span class="metric-label">Total Cases:</span>
                <span class="metric-value">{rating_info.get("total_cases", 0)}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Success Rate:</span>
                <span class="metric-value">{rating_info.get("success_rate_percent", 0):.1f}%</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Avg Response Time:</span>
                <span class="metric-value">{rating_info.get("average_response_time_minutes", 0):.1f} min</span>
            </div>
        """

    def _route_to_google_path_js(self, route_coordinates: list[dict]) -> str:
        if not route_coordinates:
            return "// No route coordinates"
        path_js = "var pathCoords = [\n"
        for c in route_coordinates:
            lat = c.get("lat", c.get("latitude", 0))
            lon = c.get("lon", c.get("longitude", 0))
            path_js += f"    {{ lat: {lat}, lng: {lon} }},\n"
        path_js = path_js.rstrip(",\n") + "\n];\n"
        path_js += """
            var routeLine = new google.maps.Polyline({
                path: pathCoords,
                geodesic: true,
                strokeColor: '#2196f3',
                strokeOpacity: 0.9,
                strokeWeight: 5
            });
            routeLine.setMap(map);
        """
        return path_js


# Example usage (standalone - does not modify other files)
if __name__ == "__main__":
    gen = GoogleEmergencyMapGenerator()
    out = os.path.join("emergency_maps", "google_emergency_map_demo.html")
    os.makedirs("emergency_maps", exist_ok=True)
    gen.generate_map_html(
        accident_lat=13.074,
        accident_lon=80.24,
        hospital_name="Sample Hospital",
        hospital_lat=13.08,
        hospital_lon=80.25,
        route_coordinates=[
            {"lat": 13.074, "lon": 80.24},
            {"lat": 13.077, "lon": 80.245},
            {"lat": 13.08, "lon": 80.25},
        ],
        route_distance_km=5.2,
        star_rating=4.2,
        output_file=out,
    )
    print(f"Google Maps HTML saved to: {out}")
    print("Set GOOGLE_MAPS_API_KEY environment variable for real maps.")
