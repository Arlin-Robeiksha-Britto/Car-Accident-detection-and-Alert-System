import pandas as pd

# Hospital CSV
hospital_df = pd.DataFrame(
    [
        ["Be Well Hospitals T Nagar", "Hospital", "+919698300300", 13.04306, 80.24534],
        ["Bharathi Rajaa Hospital & Research Center", "Hospital", "+914462116211", 13.04813, 80.24517],
        ["Raju Hospitals 24 Hrs", "Hospital", "+914424348989", 13.04190, 80.23380],
        ["Apollo Medical Center Pondy Bazaar", "Hospital", "+914442200000", 13.04130, 80.23470],
        ["Venkataeswara Hospitals Nandanam", "Hospital", "+914442108888", 13.03380, 80.24090],
        ["Medway Hospitals Kodambakkam", "Hospital", "+914446222222", 13.04930, 80.22980],
        ["SIMS Hospital Vadapalani", "Hospital", "+914449290000", 13.05210, 80.21290],
    ],
    columns=["name", "type", "phone", "latitude", "longitude"],
)

hospital_path = "/mnt/data/t_nagar_general_hospitals.csv"
hospital_df.to_csv(hospital_path, index=False)

# Police CSV
police_df = pd.DataFrame(
    [
        ["R1 Mambalam Police Station", "Police", "+914423452608", 13.03511, 80.22957],
        ["Pondy Bazaar Police Station", "Police", "+914423452624", 13.04134, 80.23442],
        ["All Women Police Station T Nagar", "Police", "+914423452699", 13.03890, 80.23620],
        ["E3 Teynampet Police Station", "Police", "+914423452635", 13.04180, 80.24740],
    ],
    columns=["name", "type", "phone", "latitude", "longitude"],
)

police_path = "/mnt/data/t_nagar_police_stations.csv"
police_df.to_csv(police_path, index=False)

hospital_path, police_path
