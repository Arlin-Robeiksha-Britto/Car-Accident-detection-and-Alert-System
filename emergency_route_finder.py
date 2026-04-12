"""
Intelligent Emergency Route Finding System
Uses Bidirectional Dijkstra algorithm for high-performance route computation
Replaces older path-finding algorithms with modern, optimized approach.
"""

from __future__ import annotations

import math
from heapq import heappop, heappush

import networkx as nx
import osmnx as ox
import pandas as pd


class BidirectionalDijkstra:
    """Bidirectional Dijkstra algorithm implementation Faster than standard Dijkstra and A* for road network routing
    Searches from both source and destination simultaneously.
    """

    def __init__(self, graph: nx.MultiDiGraph):
        self.graph = graph
        self.weight = "length"

    def find_shortest_path(self, source: int, target: int) -> tuple[list[int] | None, float]:
        """Find shortest path using bidirectional Dijkstra.

        Args:
            source: Source node ID
            target: Target node ID

        Returns:
            Tuple of (path list, total distance in meters): Returns (None, float('inf')) if no path exists
        """
        if source == target:
            return ([source], 0.0)

        # Forward search: from source
        forward_dist = {source: 0.0}
        forward_prev = {source: None}
        forward_heap = [(0.0, source)]
        forward_visited = set()

        # Backward search: from target
        backward_dist = {target: 0.0}
        backward_prev = {target: None}
        backward_heap = [(0.0, target)]
        backward_visited = set()

        # Track meeting point
        meeting_point = None
        min_total_dist = float("inf")

        # Iterate until one heap is empty
        while forward_heap or backward_heap:
            # Forward step
            if forward_heap:
                dist_f, node_f = heappop(forward_heap)
                if node_f in forward_visited:
                    continue
                forward_visited.add(node_f)

                # Check if we've found a shorter path through backward search
                if node_f in backward_dist:
                    total_dist = dist_f + backward_dist[node_f]
                    if total_dist < min_total_dist:
                        min_total_dist = total_dist
                        meeting_point = node_f

                # Expand forward
                for neighbor, edge_data in self.graph[node_f].items():
                    if neighbor in forward_visited:
                        continue

                    edge_weight = edge_data[0].get(self.weight, 1.0)
                    new_dist = dist_f + edge_weight

                    if neighbor not in forward_dist or new_dist < forward_dist[neighbor]:
                        forward_dist[neighbor] = new_dist
                        forward_prev[neighbor] = node_f
                        heappush(forward_heap, (new_dist, neighbor))

                    # Check meeting point during expansion
                    if neighbor in backward_dist:
                        total_dist = new_dist + backward_dist[neighbor]
                        if total_dist < min_total_dist:
                            min_total_dist = total_dist
                            meeting_point = neighbor

            # Backward step
            if backward_heap:
                dist_b, node_b = heappop(backward_heap)
                if node_b in backward_visited:
                    continue
                backward_visited.add(node_b)

                # Check if we've found a shorter path through forward search
                if node_b in forward_dist:
                    total_dist = dist_b + forward_dist[node_b]
                    if total_dist < min_total_dist:
                        min_total_dist = total_dist
                        meeting_point = node_b

                # Expand backward (incoming edges)
                for predecessor in self.graph.predecessors(node_b):
                    if predecessor in backward_visited:
                        continue

                    edge_data = self.graph[predecessor][node_b]
                    edge_weight = edge_data[0].get(self.weight, 1.0)
                    new_dist = dist_b + edge_weight

                    if predecessor not in backward_dist or new_dist < backward_dist[predecessor]:
                        backward_dist[predecessor] = new_dist
                        backward_prev[predecessor] = node_b
                        heappush(backward_heap, (new_dist, predecessor))

                    # Check meeting point during expansion
                    if predecessor in forward_dist:
                        total_dist = new_dist + forward_dist[predecessor]
                        if total_dist < min_total_dist:
                            min_total_dist = total_dist
                            meeting_point = predecessor

            # Early termination: if we've found a path and both searches have explored enough
            if meeting_point and min_total_dist < float("inf"):
                # Reconstruct path
                path = []

                # Forward path
                node = meeting_point
                forward_path = []
                while node is not None:
                    forward_path.append(node)
                    node = forward_prev.get(node)
                forward_path.reverse()

                # Backward path (without meeting point to avoid duplication)
                node = backward_prev.get(meeting_point)
                backward_path = []
                while node is not None:
                    backward_path.append(node)
                    node = backward_prev.get(node)

                path = forward_path + backward_path
                return (path, min_total_dist)

        return (None, float("inf"))


class EmergencyRouteFinder:
    """Intelligent Emergency Route Finding System Finds optimal routes between hospitals and accident locations.
    """

    def __init__(self, places_dataset_path: str = "places_dataset.csv"):
        self.dataset_path = places_dataset_path
        self.graph_cache = {}

    def haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate great circle distance between two points in km."""
        R = 6371  # Earth radius in km
        d_lat = math.radians(lat2 - lat1)
        d_lon = math.radians(lon2 - lon1)
        a = (
            math.sin(d_lat / 2) ** 2
            + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(d_lon / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def get_road_network(
        self, center_lat: float, center_lon: float, radius_m: int = 5000, show_progress: bool = True
    ) -> nx.MultiDiGraph:
        """Get or create road network graph for the area Uses caching to avoid repeated API calls.

        Args:
            center_lat, center_lon: Center point coordinates
            radius_m: Search radius in meters (smaller = faster, default 5000m)
            show_progress: Show progress messages
        """
        cache_key = f"{center_lat:.4f}_{center_lon:.4f}_{radius_m}"
        if cache_key in self.graph_cache:
            if show_progress:
                print("   ✓ Using cached road network")
            return self.graph_cache[cache_key]

        if show_progress:
            print(f"   ⏳ Downloading road network (radius: {radius_m / 1000:.1f}km)...")
            print("      This may take 10-30 seconds on first run...")

        try:
            # Configure OSMnx to be faster
            ox.settings.timeout = 60  # 60 second timeout
            ox.settings.memory = 2000000000  # 2GB memory limit

            G = ox.graph_from_point(
                (center_lat, center_lon),
                dist=radius_m,
                network_type="drive",
                simplify=True,  # Simplify graph for faster processing
            )

            if show_progress:
                print(f"   ✓ Road network downloaded ({len(G.nodes)} nodes, {len(G.edges)} edges)")

            # OSMnx stores coordinates as lat/lon in 'y'/'x' attributes
            self.graph_cache[cache_key] = G
            return G
        except Exception as e:
            if show_progress:
                print(f"   ❌ Error fetching road network: {e}")
                print("   💡 Tip: Check internet connection or try 'fast_mode=True'")
            return None

    def find_optimal_hospital_route(
        self,
        accident_lat: float,
        accident_lon: float,
        hospital_lat: float,
        hospital_lon: float,
        radius_m: int = 5000,
        fast_mode: bool = False,
        show_progress: bool = True,
    ) -> dict:
        """Find optimal route from hospital to accident location.

        Args:
            accident_lat, accident_lon: Accident location coordinates
            hospital_lat, hospital_lon: Hospital location coordinates
            radius_m: Search radius in meters

        Returns:
            Dictionary containing route information including path, distance, coordinates
        """
        # Fast mode: Use straight-line distance (no road network download)
        if fast_mode:
            if show_progress:
                print("   ⚡ Fast mode: Using straight-line distance")
            straight_distance = self.haversine_distance(accident_lat, accident_lon, hospital_lat, hospital_lon)

            # Create simple path coordinates (straight line for visualization)
            path_coordinates = [{"lat": hospital_lat, "lon": hospital_lon}, {"lat": accident_lat, "lon": accident_lon}]

            return {
                "success": True,
                "path_nodes": [],
                "path_coordinates": path_coordinates,
                "distance_km": straight_distance,
                "distance_m": straight_distance * 1000,
                "hospital_coords": {"lat": hospital_lat, "lon": hospital_lon},
                "accident_coords": {"lat": accident_lat, "lon": accident_lon},
                "fast_mode": True,
                "note": "Straight-line distance (fast mode - no road network routing)",
            }

        # Normal mode: Use actual road network
        # Get road network centered between accident and hospital
        center_lat = (accident_lat + hospital_lat) / 2
        center_lon = (accident_lon + hospital_lon) / 2

        G = self.get_road_network(center_lat, center_lon, radius_m, show_progress)
        if G is None:
            # Fallback to fast mode if network download fails
            if show_progress:
                print("   ⚠️  Falling back to fast mode (straight-line distance)")
            return self.find_optimal_hospital_route(
                accident_lat, accident_lon, hospital_lat, hospital_lon, fast_mode=True, show_progress=show_progress
            )

        # Find nearest nodes
        try:
            accident_node = ox.distance.nearest_nodes(G, X=accident_lon, Y=accident_lat)
            hospital_node = ox.distance.nearest_nodes(G, X=hospital_lon, Y=hospital_lat)
        except Exception as e:
            return {"success": False, "error": f"Could not find nodes: {e}"}

        # Use Bidirectional Dijkstra to find optimal path
        route_finder = BidirectionalDijkstra(G)
        path, distance_m = route_finder.find_shortest_path(hospital_node, accident_node)

        if path is None:
            return {"success": False, "error": "No route found between hospital and accident location"}

        # Extract coordinates for the path
        # OSMnx stores coordinates as 'y' (latitude) and 'x' (longitude) in unprojected graphs
        path_coordinates = []
        for node in path:
            node_data = G.nodes[node]
            # Get lat/lon from node data (y=lat, x=lon in OSMnx convention)
            lat = node_data.get("y", node_data.get("lat", 0))
            lon = node_data.get("x", node_data.get("lon", 0))
            path_coordinates.append({"lat": float(lat), "lon": float(lon)})

        return {
            "success": True,
            "path_nodes": path,
            "path_coordinates": path_coordinates,
            "distance_km": distance_m / 1000.0,
            "distance_m": distance_m,
            "hospital_coords": {"lat": hospital_lat, "lon": hospital_lon},
            "accident_coords": {"lat": accident_lat, "lon": accident_lon},
            "hospital_node": hospital_node,
            "accident_node": accident_node,
        }

    def find_nearest_hospitals_with_routes(
        self,
        accident_lat: float,
        accident_lon: float,
        num_hospitals: int = 3,
        max_radius_km: float = 20.0,
        fast_mode: bool = False,
        show_progress: bool = True,
        emergency_24x7_only: bool = False,
    ) -> list[dict]:
        """Find nearest hospitals with optimal routes to accident location. When emergency_24x7_only=True, only include
        hospitals with Emergency_24x7=Y if column exists.

        Args:
            accident_lat, accident_lon: Accident location
            num_hospitals: Number of hospitals to return
            max_radius_km: Maximum search radius in km
            emergency_24x7_only: If True, filter to 24x7 emergency hospitals only

        Returns:
            List of dictionaries with hospital info and route details
        """
        try:
            df = pd.read_csv(self.dataset_path)
        except Exception as e:
            return [{"error": f"Could not load dataset: {e}"}]

        # Filter hospitals
        hospitals_df = df[df["Category"].str.contains("Hospital", case=False, na=False)].copy()
        if emergency_24x7_only and "Emergency_24x7" in hospitals_df.columns:
            hospitals_df = hospitals_df[
                hospitals_df["Emergency_24x7"].astype(str).str.upper().str.strip().isin(("Y", "YES", "1"))
            ]

        if hospitals_df.empty:
            return [{"error": "No hospitals found in dataset"}]

        # Calculate straight-line distances
        hospitals_df["Distance_km"] = hospitals_df.apply(
            lambda row: self.haversine_distance(accident_lat, accident_lon, row["Latitude"], row["Longitude"]), axis=1
        )

        # Filter by max radius
        hospitals_df = hospitals_df[hospitals_df["Distance_km"] <= max_radius_km]
        hospitals_df = hospitals_df.sort_values(by="Distance_km").head(num_hospitals)

        results = []
        for _, hospital in hospitals_df.iterrows():
            route_info = self.find_optimal_hospital_route(
                accident_lat,
                accident_lon,
                hospital["Latitude"],
                hospital["Longitude"],
                fast_mode=fast_mode,
                show_progress=show_progress and (len(results) == 0),  # Only show progress for first
            )

            if route_info["success"]:
                results.append(
                    {
                        "hospital_name": hospital.get("Name", "Unknown"),
                        "hospital_address": hospital.get("Address", ""),
                        "hospital_phone": hospital.get("Phone", ""),
                        "hospital_lat": hospital["Latitude"],
                        "hospital_lon": hospital["Longitude"],
                        "straight_distance_km": hospital["Distance_km"],
                        "route_distance_km": route_info["distance_km"],
                        "route_distance_m": route_info["distance_m"],
                        "route_coordinates": route_info["path_coordinates"],
                        "route_success": True,
                    }
                )
            else:
                # Still include hospital info even if route failed
                results.append(
                    {
                        "hospital_name": hospital.get("Name", "Unknown"),
                        "hospital_address": hospital.get("Address", ""),
                        "hospital_phone": hospital.get("Phone", ""),
                        "hospital_lat": hospital["Latitude"],
                        "hospital_lon": hospital["Longitude"],
                        "straight_distance_km": hospital["Distance_km"],
                        "route_error": route_info.get("error", "Unknown error"),
                        "route_success": False,
                    }
                )

        return results
