"""
Accident Report Generator
Generates HTML reports from emergency response data.
Reads from response dict or from saved emergency_response_*.json files.
Does not modify any existing project files.
"""

from __future__ import annotations

import json
import os
from datetime import datetime


class AccidentReportGenerator:
    """Generates printable HTML reports for accident response."""

    def __init__(self, reports_dir: str = "api_data"):
        self.reports_dir = reports_dir

    def generate_report_html(
        self,
        response_data: dict | str,
        output_file: str | None = None,
        include_google_map_link: bool = True,
    ) -> str:
        """Generate HTML report from emergency response data.

        Args:
            response_data: Either a dict (from handle_accident) or path to emergency_response_*.json
            output_file: Optional path to save report (default: api_data/accident_report_<id>.html)
            include_google_map_link: Add a Google Maps link to open location

        Returns:
            HTML content as string
        """
        if isinstance(response_data, str):
            with open(response_data, encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = response_data

        if not data.get("success"):
            return self._error_report_html(data.get("error", "Unknown error"), data.get("accident_id", "unknown"))

        acc_id = data.get("accident_id", "unknown")
        acc_loc = data.get("accident_location", {})
        hospital = data.get("selected_hospital", {})
        route = data.get("route", {})
        ts = data.get("timestamp", datetime.now().isoformat())
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            ts_formatted = dt.strftime("%d %b %Y, %H:%M:%S")
        except Exception:
            ts_formatted = ts

        lat = acc_loc.get("latitude", 0)
        lon = acc_loc.get("longitude", 0)
        google_map_url = ""
        if include_google_map_link and (lat or lon):
            google_map_url = f"https://www.google.com/maps?q={lat},{lon}"

        star_rating = hospital.get("star_rating", 0)
        stars_html = self._stars(star_rating)

        alt_hospitals = data.get("alternative_hospitals", [])
        alt_rows = ""
        for h in alt_hospitals:
            alt_rows += f"""
                <tr>
                    <td>{h.get("name", "")}</td>
                    <td>{h.get("distance_km", 0):.2f} km</td>
                    <td>{h.get("rating", 0):.1f}/5</td>
                </tr>
            """

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accident Report - {acc_id}</title>
    <style>
        * {{ box-sizing: border-box; }}
        body {{ font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 24px; background: #f5f5f5; color: #333; }}
        .report {{ max-width: 800px; margin: 0 auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }}
        h1 {{ color: #c62828; margin-top: 0; border-bottom: 3px solid #c62828; padding-bottom: 12px; font-size: 24px; }}
        h2 {{ color: #1565c0; font-size: 18px; margin-top: 24px; }}
        .section {{ margin-bottom: 24px; }}
        .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
        @media (max-width: 600px) {{ .grid {{ grid-template-columns: 1fr; }} }}
        .card {{ background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1565c0; }}
        .card.accident {{ border-left-color: #c62828; background: #ffebee; }}
        .card.hospital {{ border-left-color: #2e7d32; background: #e8f5e9; }}
        .label {{ font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }}
        .value {{ font-weight: 600; font-size: 15px; }}
        .stars {{ color: #ffa000; font-size: 18px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 8px; }}
        th, td {{ padding: 10px 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }}
        th {{ background: #e3f2fd; color: #1565c0; font-weight: 600; }}
        .footer {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }}
        .btn {{ display: inline-block; margin-top: 12px; padding: 10px 20px; background: #1565c0; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }}
        .btn:hover {{ background: #0d47a1; }}
        .map-file {{ font-size: 13px; color: #2e7d32; word-break: break-all; }}
    </style>
</head>
<body>
    <div class="report">
        <h1>Accident Response Report</h1>
        <p class="footer" style="margin-top: 0;">Report ID: <strong>{acc_id}</strong> &nbsp;|&nbsp; Generated: {ts_formatted}</p>

        <div class="section">
            <h2>Accident Location</h2>
            <div class="card accident">
                <div class="grid">
                    <div>
                        <div class="label">Latitude</div>
                        <div class="value">{lat:.6f}</div>
                    </div>
                    <div>
                        <div class="label">Longitude</div>
                        <div class="value">{lon:.6f}</div>
                    </div>
                </div>
                {f'<a href="{google_map_url}" target="_blank" class="btn">Open in Google Maps</a>' if google_map_url else ""}
            </div>
        </div>

        <div class="section">
            <h2>Selected Hospital</h2>
            <div class="card hospital">
                <div class="label">Name</div>
                <div class="value" style="font-size: 18px;">{hospital.get("name", "")}</div>
                <div class="label" style="margin-top: 8px;">Rating</div>
                <div class="stars">{stars_html} ({star_rating:.1f}/5.0)</div>
                <div class="grid" style="margin-top: 12px;">
                    <div>
                        <div class="label">Address</div>
                        <div class="value" style="font-size: 14px;">{hospital.get("address", "—")}</div>
                    </div>
                    <div>
                        <div class="label">Phone</div>
                        <div class="value">{hospital.get("phone", "—")}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Route</h2>
            <div class="card">
                <div class="grid">
                    <div>
                        <div class="label">Distance</div>
                        <div class="value">{route.get("distance_km", 0):.2f} km</div>
                    </div>
                    <div>
                        <div class="label">Distance (meters)</div>
                        <div class="value">{route.get("distance_m", 0)} m</div>
                    </div>
                </div>
                {f'<div class="label" style="margin-top: 12px;">Map file</div><div class="map-file">{data.get("map_file", "—")}</div>' if data.get("map_file") else ""}
            </div>
        </div>

        {f'<div class="section"><h2>Alternative Hospitals</h2><table><thead><tr><th>Name</th><th>Distance</th><th>Rating</th></tr></thead><tbody>{alt_rows}</tbody></table></div>' if alt_rows.strip() else ""}

        <div class="footer">
            This report was generated by the Accident Report Generator. Data source: emergency response system.
        </div>
    </div>
</body>
</html>"""

        if output_file is None:
            output_file = os.path.join(self.reports_dir, f"accident_report_{acc_id}.html")
        os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html)

        return html

    def _stars(self, rating: float) -> str:
        full = int(rating)
        half = 1 if (rating - full) >= 0.5 else 0
        empty = 5 - full - half
        return "★" * full + ("½" if half else "") + "☆" * empty

    def _error_report_html(self, error: str, accident_id: str) -> str:
        html = f"""<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Report Error</title></head>
<body style="font-family: Arial; padding: 24px;">
    <h1 style="color: #c62828;">Report Error</h1>
    <p>Accident ID: {accident_id}</p>
    <p><strong>Error:</strong> {error}</p>
</body></html>"""
        return html

    def generate_from_json_file(self, json_path: str, output_file: str | None = None) -> str:
        """Convenience: generate report from a saved emergency_response_*.json path."""
        return self.generate_report_html(json_path, output_file=output_file)


# Example usage (standalone)
if __name__ == "__main__":
    generator = AccidentReportGenerator(reports_dir="api_data")

    # Example with dict (e.g. from emergency_response_system.handle_accident())
    sample_response = {
        "success": True,
        "accident_id": "accident_demo_001",
        "accident_location": {"latitude": 13.074, "longitude": 80.24},
        "selected_hospital": {
            "name": "Sample General Hospital",
            "address": "123 Main St, Chennai",
            "phone": "+91 44 12345678",
            "star_rating": 4.2,
        },
        "route": {"distance_km": 5.2, "distance_m": 5200},
        "map_file": "emergency_maps/emergency_route_map_accident_demo_001.html",
        "alternative_hospitals": [
            {"name": "City Hospital", "distance_km": 6.1, "rating": 4.0},
            {"name": "Central Medical", "distance_km": 7.0, "rating": 3.8},
        ],
        "timestamp": datetime.now().isoformat(),
    }

    out_path = os.path.join("api_data", "accident_report_demo.html")
    os.makedirs("api_data", exist_ok=True)
    generator.generate_report_html(sample_response, output_file=out_path)
    print(f"Report saved to: {out_path}")
