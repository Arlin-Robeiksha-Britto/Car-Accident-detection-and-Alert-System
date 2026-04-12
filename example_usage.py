"""
Example Usage of Emergency Response System
Demonstrates how to use the new intelligent route finding and hospital rating system.
"""

from emergency_response_system import EmergencyResponseSystem


def example_basic_usage():
    """Basic example: Handle an accident and get route."""
    print("=" * 60)
    print("Example 1: Basic Accident Handling")
    print("=" * 60)

    # Initialize the system
    emergency = EmergencyResponseSystem()

    # Simulate accident at Chennai, India
    accident_lat = 13.074
    accident_lon = 80.24

    # Handle accident - automatically finds best hospital and route
    # Use fast_mode=True for instant results, or fast_mode=False for accurate road routing
    response = emergency.handle_accident(
        accident_lat=accident_lat,
        accident_lon=accident_lon,
        generate_map=True,
        fast_mode=True,  # Set to False for accurate road routing (slower)
    )

    if response["success"]:
        print("\n✅ Accident handled successfully!")
        print(f"Accident ID: {response['accident_id']}")
        print(f"\nSelected Hospital: {response['selected_hospital']['name']}")
        print(f"Star Rating: {response['selected_hospital']['star_rating']:.1f}/5.0")
        print(f"Route Distance: {response['route']['distance_km']:.2f} km")
        print(f"Map saved to: {response['map_file']}")
    else:
        print(f"\n❌ Error: {response.get('error', 'Unknown error')}")


def example_hospital_rating_update():
    """Example: Update hospital ratings based on treatment outcomes.
    """
    print("\n" + "=" * 60)
    print("Example 2: Recording Treatment Outcomes")
    print("=" * 60)

    emergency = EmergencyResponseSystem()

    # Record a successful treatment outcome
    emergency.record_treatment_outcome(
        accident_id="accident_20260108_093319",
        hospital_name="HAPPY MOM-Pregnancy to Motherhood",
        patient_outcome="successful",  # 'successful', 'partial', or 'unsuccessful'
        quality_score=85.0,  # 0-100 scale
        response_time_minutes=12.5,
        treatment_notes="Patient stabilized quickly, excellent emergency response",
    )

    print("✅ Treatment outcome recorded!")
    print("Hospital rating will be updated automatically based on performance.")


def example_view_hospital_performance():
    """Example: View hospital performance metrics.
    """
    print("\n" + "=" * 60)
    print("Example 3: Hospital Performance Report")
    print("=" * 60)

    emergency = EmergencyResponseSystem()

    # Get performance for a specific hospital
    hospital_name = "HAPPY MOM-Pregnancy to Motherhood"
    performance = emergency.get_hospital_performance_report(hospital_name)

    if performance:
        print(f"\nHospital: {performance['hospital_name']}")
        print(f"Current Rating: {performance['current_rating']:.1f}/5.0 stars")
        print(f"Total Cases: {performance['total_cases']}")
        print(f"Success Rate: {performance['success_rate_percent']:.1f}%")
        print(f"Average Response Time: {performance['average_response_time_minutes']:.1f} minutes")
        print(f"Average Quality Score: {performance['average_quality_score']:.1f}/100")
    else:
        print(f"Hospital '{hospital_name}' not found in database")


def example_top_hospitals():
    """Example: Get list of top-performing hospitals.
    """
    print("\n" + "=" * 60)
    print("Example 4: Top Performing Hospitals")
    print("=" * 60)

    emergency = EmergencyResponseSystem()

    # Get top 5 hospitals
    top_hospitals = emergency.get_top_performing_hospitals(limit=5)

    if top_hospitals:
        print("\nTop Performing Hospitals:")
        for i, hospital in enumerate(top_hospitals, 1):
            print(f"\n{i}. {hospital['hospital_name']}")
            print(f"   Rating: {hospital['current_rating']:.1f}/5.0 ⭐")
            print(f"   Cases: {hospital['total_cases']}")
            print(f"   Success Rate: {hospital['success_rate_percent']:.1f}%")
            print(f"   Avg Response Time: {hospital['average_response_time_minutes']:.1f} min")
    else:
        print("No hospitals with case history found")


if __name__ == "__main__":
    print("\n🚨 Emergency Response System - Example Usage\n")

    # Run examples
    try:
        example_basic_usage()
        example_hospital_rating_update()
        example_view_hospital_performance()
        example_top_hospitals()

        print("\n" + "=" * 60)
        print("✅ All examples completed!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ Error running examples: {e}")
        import traceback

        traceback.print_exc()
