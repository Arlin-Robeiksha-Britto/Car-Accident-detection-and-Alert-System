import math

import pandas as pd


# Haversine distance formula (in km)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(d_lon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def get_nearest_places(
    acc_lat, acc_lon, dataset_path="C:\Road-Accident-Detection-Alert-System-main\yolov5\places_dataset.csv"
):
    # Load dataset
    df = pd.read_csv(dataset_path)

    # Compute distance
    df["Distance_km"] = df.apply(lambda row: haversine(acc_lat, acc_lon, row["Latitude"], row["Longitude"]), axis=1)

    # Sort by distance
    df_sorted = df.sort_values(by="Distance_km")

    # Select 2 police, 1 hospital, up to 3 stores
    police = df_sorted[df_sorted["Category"].str.contains("Police", case=False)].head(2)
    hospital = df_sorted[df_sorted["Category"].str.contains("Hospital", case=False)].head(1)
    stores = df_sorted[df_sorted["Category"].str.contains("Store", case=False)].head(3)

    # Combine results
    nearest = pd.concat([police, hospital, stores])
    return nearest
