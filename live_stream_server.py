"""
Live accident video stream server.
Streams detection source to emergency dashboard and assigned hospital (same stream URL).
Run: python live_stream_server.py
Dashboard: http://127.0.0.1:5000/.
"""

import threading
import time
from pathlib import Path

try:
    from flask import Flask, Response, jsonify, render_template_string, request
except ImportError:
    print("Install Flask: pip install flask")
    raise

ROOT = Path(__file__).resolve().parent
app = Flask(__name__)

# Shared: latest frame from detection (set by run_accident_system or camera feed)
_latest_frame = None
_lock = threading.Lock()
_current_alert = None  # {"accident_id", "hospital", "map_leaflet", "map_google", "timestamp"}


def set_latest_frame(frame_bytes):
    """Set latest JPEG frame (call from detection loop)."""
    global _latest_frame
    with _lock:
        _latest_frame = frame_bytes


def set_current_alert(alert_dict):
    """Set current accident alert for dashboard (map links, hospital, etc.)."""
    global _current_alert
    with _lock:
        _current_alert = alert_dict


def get_current_alert():
    with _lock:
        return _current_alert if _current_alert else {}


DASHBOARD_HTML = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Emergency Dashboard</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: Segoe UI, Arial; margin: 0; background: #1a1a2e; color: #eee; }
        .header { background: #16213e; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; }
        .header h1 { margin: 0; font-size: 1.3em; color: #e94560; }
        .live-badge { background: #e94560; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
        .container { display: flex; flex-wrap: wrap; padding: 15px; gap: 15px; }
        .card { background: #16213e; border-radius: 8px; padding: 15px; flex: 1 1 400px; }
        .card h2 { margin-top: 0; font-size: 1em; color: #0f3460; }
        #stream { width: 100%; max-height: 400px; object-fit: contain; background: #000; border-radius: 6px; }
        .alert-info { background: #0f3460; padding: 12px; border-radius: 6px; margin-top: 10px; }
        .alert-info p { margin: 6px 0; }
        .links a { color: #e94560; margin-right: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Emergency Dashboard – Live Accident Detection</h1>
        <span class="live-badge">LIVE</span>
    </div>
    <div class="container">
        <div class="card">
            <h2>Live stream from detection source</h2>
            <img id="stream" src="/video_feed" alt="Live stream">
        </div>
        <div class="card">
            <h2>Current alert</h2>
            <div id="alert" class="alert-info">
                <p>No active alert.</p>
                <p id="hospital"></p>
                <div id="links" class="links"></div>
            </div>
        </div>
    </div>
    <script>
        function refreshAlert() {
            fetch('/api/alert').then(r => r.json()).then(d => {
                if (d.accident_id) {
                    document.getElementById('hospital').textContent = 'Assigned hospital: ' + (d.hospital || '—');
                    var links = document.getElementById('links');
                    links.innerHTML = '';
                    if (d.map_leaflet) links.innerHTML += '<a target="_blank" href="' + d.map_leaflet + '">Leaflet map</a> ';
                    if (d.map_google) links.innerHTML += '<a target="_blank" href="' + d.map_google + '">Google map</a>';
                }
            }).catch(() => {});
        }
        setInterval(refreshAlert, 2000);
        refreshAlert();
    </script>
</body>
</html>
"""


@app.route("/")
def index():
    """Emergency dashboard (and hospital view – same page)."""
    return render_template_string(DASHBOARD_HTML)


@app.route("/video_feed")
def video_feed():
    """MJPEG stream for live accident video."""

    def generate():
        while True:
            with _lock:
                frame = _latest_frame
            if frame:
                yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")
            else:
                # Placeholder: single black frame
                yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + b"" + b"\r\n")
            time.sleep(0.05)

    return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/api/alert")
def api_alert():
    """Current alert info for dashboard (assigned hospital, map links)."""
    a = get_current_alert()
    return jsonify(
        {
            "accident_id": a.get("accident_id"),
            "hospital": a.get("hospital"),
            "map_leaflet": a.get("map_leaflet"),
            "map_google": a.get("map_google"),
            "timestamp": a.get("timestamp"),
        }
    )


def run_server(host="0.0.0.0", port=5000):
    """Run Flask app (call in a thread from main app)."""
    app.run(host=host, port=port, threaded=True, use_reloader=False)


if __name__ == "__main__":
    run_server()
