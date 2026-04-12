"""
Enhanced Emergency Map Generator
Creates interactive maps showing:
- Hospital location (starting point)
- Accident location (destination)
- Optimal route highlighted between them
- Hospital star ratings displayed.
"""

from __future__ import annotations

from emergency_route_finder import EmergencyRouteFinder
from hospital_rating_system import HospitalRatingSystem


class EmergencyMapGenerator:
    """Generates interactive HTML maps with route visualization."""

    def __init__(self, places_dataset_path: str = "places_dataset.csv"):
        self.route_finder = EmergencyRouteFinder(places_dataset_path)
        self.rating_system = HospitalRatingSystem()

    def generate_map_html(
        self,
        accident_lat: float,
        accident_lon: float,
        hospital_name: str | None = None,
        hospital_lat: float | None = None,
        hospital_lon: float | None = None,
        output_file: str | None = None,
    ) -> str:
        """Generate interactive HTML map with route visualization.

        Args:
            accident_lat, accident_lon: Accident location coordinates
            hospital_name: Name of hospital (will look up if coordinates not provided)
            hospital_lat, hospital_lon: Hospital coordinates (optional if name provided)
            output_file: Optional output file path

        Returns:
            HTML content as string
        """
        # If hospital name provided, try to get coordinates from dataset
        if hospital_name and not hospital_lat:
            import pandas as pd

            try:
                df = pd.read_csv(self.route_finder.dataset_path)
                hospital_data = df[df["Name"].str.contains(hospital_name, case=False, na=False)]
                if not hospital_data.empty:
                    hospital_lat = hospital_data.iloc[0]["Latitude"]
                    hospital_lon = hospital_data.iloc[0]["Longitude"]
                    hospital_name = hospital_data.iloc[0]["Name"]
            except Exception as e:
                print(f"Error looking up hospital: {e}")

        # If no hospital specified, find nearest
        if not hospital_lat or not hospital_lon:
            hospitals = self.route_finder.find_nearest_hospitals_with_routes(
                accident_lat, accident_lon, num_hospitals=1
            )
            if hospitals and hospitals[0].get("route_success"):
                hospital_lat = hospitals[0]["hospital_lat"]
                hospital_lon = hospitals[0]["hospital_lon"]
                hospital_name = hospitals[0]["hospital_name"]
            else:
                return "<html><body>Error: Could not find hospital</body></html>"

        # Get hospital rating
        rating_info = None
        if hospital_name:
            rating_info = self.rating_system.get_hospital_rating(hospital_name)
            if not rating_info:
                # Register hospital if not in system
                self.rating_system.register_hospital(hospital_name, latitude=hospital_lat, longitude=hospital_lon)
                rating_info = self.rating_system.get_hospital_rating(hospital_name)

        # Find optimal route
        route_info = self.route_finder.find_optimal_hospital_route(
            accident_lat, accident_lon, hospital_lat, hospital_lon
        )

        if not route_info.get("success"):
            route_coordinates = []
            route_distance_km = 0
        else:
            route_coordinates = route_info["path_coordinates"]
            route_distance_km = route_info["distance_km"]

        # Get star rating
        star_rating = rating_info["current_rating"] if rating_info else 2.5
        stars_html = self._generate_star_html(star_rating)

        # Generate HTML
        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Emergency Response Route Map</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
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
        .info-panel h3 {{
            margin-top: 0;
            color: #d32f2f;
            border-bottom: 2px solid #d32f2f;
            padding-bottom: 10px;
        }}
        .hospital-info {{
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }}
        .hospital-name {{
            font-size: 18px;
            font-weight: bold;
            color: #1976d2;
            margin-bottom: 10px;
        }}
        .star-rating {{
            font-size: 20px;
            color: #ffa000;
            margin: 10px 0;
        }}
        .route-info {{
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #2196f3;
        }}
        .accident-info {{
            background: #ffebee;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #d32f2f;
        }}
        .metric-item {{
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
        }}
        .metric-label {{
            color: #666;
            font-weight: 500;
        }}
        .metric-value {{
            font-weight: bold;
            color: #333;
        }}
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
        .legend-item {{
            margin: 8px 0;
            display: flex;
            align-items: center;
        }}
        .legend-icon {{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border-radius: 50%;
            border: 2px solid #333;
        }}
        .route-line {{
            stroke: #2196f3;
            stroke-width: 5;
            stroke-opacity: 0.8;
            fill: none;
        }}
        @keyframes pulse {{
            0% {{ opacity: 1; transform: scale(1); }}
            50% {{ opacity: 0.7; transform: scale(1.2); }}
            100% {{ opacity: 1; transform: scale(1); }}
        }}
        .pulse-marker {{
            animation: pulse 2s infinite;
        }}
    </style>
</head>
<body>
    <div id="map"></div>
    
    <div class="info-panel">
        <h3>🚨 Emergency Response Information</h3>
        
        <div class="hospital-info">
            <div class="hospital-name">🏥 {hospital_name or "Nearest Hospital"}</div>
            <div class="star-rating">
                Rating: {stars_html} ({star_rating:.1f}/5.0)
            </div>
            {self._format_hospital_metrics(rating_info) if rating_info else ""}
        </div>
        
        <div class="route-info">
            <h4 style="margin-top: 0;">📍 Route Information</h4>
            <div class="metric-item">
                <span class="metric-label">Distance:</span>
                <span class="metric-value">{route_distance_km:.2f} km</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Status:</span>
                <span class="metric-value">{"✅ Route Found" if route_info.get("success") else "❌ No Route"}</span>
            </div>
        </div>
        
        <div class="accident-info">
            <h4 style="margin-top: 0;">⚠️ Accident Location</h4>
            <div class="metric-item">
                <span class="metric-label">Latitude:</span>
                <span class="metric-value">{accident_lat:.6f}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Longitude:</span>
                <span class="metric-value">{accident_lon:.6f}</span>
            </div>
        </div>
    </div>
    
    <div class="legend">
        <h4 style="margin-top: 0;">Map Legend</h4>
        <div class="legend-item">
            <div class="legend-icon" style="background: #d32f2f;"></div>
            <span><strong>Accident Location</strong></span>
        </div>
        <div class="legend-item">
            <div class="legend-icon" style="background: #1976d2;"></div>
            <span>Hospital (Starting Point)</span>
        </div>
        <div class="legend-item">
            <div style="width: 30px; height: 5px; background: #2196f3; margin-right: 10px;"></div>
            <span>Optimal Route</span>
        </div>
    </div>
    
    <script>
        // Initialize map centered between hospital and accident
        var centerLat = {(accident_lat + hospital_lat) / 2};
        var centerLon = {(accident_lon + hospital_lon) / 2};
        var map = L.map('map').setView([centerLat, centerLon], 13);
        
        // Add tile layer
        L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
            attribution: '© OpenStreetMap contributors'
        }}).addTo(map);
        
        // Hospital marker (starting point)
        var hospitalIcon = L.icon({{
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            iconSize: [35, 50],
            iconAnchor: [17, 50],
            popupAnchor: [1, -50]
        }});
        
        var hospitalMarker = L.marker([{hospital_lat}, {hospital_lon}], {{icon: hospitalIcon}})
            .addTo(map)
            .bindPopup('<div style="text-align: center;"><b>🏥 HOSPITAL</b><br>' +
                      '<strong>{hospital_name or "Nearest Hospital"}</strong><br>' +
                      'Rating: {stars_html} ({star_rating:.1f}/5.0)<br>' +
                      'Lat: {hospital_lat:.6f}<br>Lon: {hospital_lon:.6f}</div>');
        
        // Accident marker (destination) with pulsing effect
        var accidentIcon = L.icon({{
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [40, 55],
            iconAnchor: [20, 55],
            popupAnchor: [1, -55]
        }});
        
        var accidentCircle = L.circleMarker([{accident_lat}, {accident_lon}], {{
            radius: 18,
            fillColor: '#d32f2f',
            color: '#8B0000',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.8,
            className: 'pulse-marker'
        }}).addTo(map);
        
        var accidentMarker = L.marker([{accident_lat}, {accident_lon}], {{icon: accidentIcon}})
            .addTo(map)
            .bindPopup('<div style="background: #ff4444; color: white; padding: 15px; border-radius: 5px; text-align: center;">' +
                      '<b>🚨 ACCIDENT LOCATION 🚨</b><br><br>' +
                      'Latitude: {accident_lat:.6f}<br>' +
                      'Longitude: {accident_lon:.6f}<br><br>' +
                      '<span style="font-size: 12px;">Emergency services dispatched</span></div>');
        
        // Draw route if available
        {self._generate_route_js(route_coordinates) if route_coordinates else "// No route available"}
        
        // Fit bounds to show both markers and route
        var bounds = new L.LatLngBounds([
            [{accident_lat}, {accident_lon}],
            [{hospital_lat}, {hospital_lon}]
        ]);
        map.fitBounds(bounds, {{padding: [50, 50]}});
        
        // Open popups
        hospitalMarker.openPopup();
        setTimeout(function() {{
            accidentMarker.openPopup();
        }}, 1000);
    </script>
</body>
</html>"""

        # Save to file if specified
        if output_file:
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(html_content)

        return html_content

    def _generate_star_html(self, rating: float) -> str:
        """Generate HTML for star rating display."""
        full_stars = int(rating)
        half_star = 1 if (rating - full_stars) >= 0.5 else 0
        empty_stars = 5 - full_stars - half_star

        stars = "★" * full_stars
        stars += "½" * half_star
        stars += "☆" * empty_stars

        return stars

    def _format_hospital_metrics(self, rating_info: dict) -> str:
        """Format hospital performance metrics as HTML."""
        if not rating_info:
            return ""

        metrics_html = f"""
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
            <div class="metric-item">
                <span class="metric-label">Quality Score:</span>
                <span class="metric-value">{rating_info.get("average_quality_score", 0):.1f}/100</span>
            </div>
        """
        return metrics_html

    def _generate_route_js(self, route_coordinates: list[dict]) -> str:
        """Generate JavaScript code to draw route on map."""
        if not route_coordinates:
            return ""

        # Convert coordinates to JavaScript array
        coords_js = "var routeCoordinates = [\n"
        for coord in route_coordinates:
            coords_js += f"        [{coord['lat']}, {coord['lon']}],\n"
        coords_js = coords_js.rstrip(",\n") + "\n    ];"

        route_drawing_js = f"""
        {coords_js}
        
        // Draw route polyline
        var routePolyline = L.polyline(routeCoordinates, {{
            color: '#2196f3',
            weight: 5,
            opacity: 0.8,
            smoothFactor: 1.0
        }}).addTo(map);
        
        // Add route to bounds
        routePolyline.addTo(map);
        
        // Animate route drawing (optional)
        routePolyline.on('add', function() {{
            this.setStyle({{
                opacity: 0
            }});
            this.bringToFront();
            var i = 0;
            var drawRoute = setInterval(function() {{
                if (i >= routeCoordinates.length) {{
                    clearInterval(drawRoute);
                    return;
                }}
                var partialRoute = routeCoordinates.slice(0, i + 1);
                if (partialRoute.length > 1) {{
                    var partialPolyline = L.polyline(partialRoute, {{
                        color: '#2196f3',
                        weight: 5,
                        opacity: 0.8
                    }}).addTo(map);
                }}
                i += Math.max(1, Math.floor(routeCoordinates.length / 20));
            }}, 100);
        }});
        """

        return route_drawing_js
