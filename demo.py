"""
Quick Demo Script - Run this to see all features in action!
This demonstrates the emergency route finding and hospital rating system.
"""

import os

from emergency_response_system import EmergencyResponseSystem
from enhanced_alert_system import show_enhanced_gui_alert


def main():
    print("\n" + "=" * 70)
    print("🚨 Emergency Route Finding & Hospital Rating System - DEMO")
    print("=" * 70)

    print("\n📋 Options:")
    print("1. Demo Route Finding & Map Generation (Console Output)")
    print("2. Demo GUI Alert with Route Finding (Interactive)")
    print("3. Demo Hospital Rating System")
    print("4. Run All Demos")
    print("\nEnter your choice (1-4): ", end="")

    try:
        choice = input().strip()

        if choice == "1" or choice == "4":
            demo_route_finding()

        if choice == "2" or choice == "4":
            demo_gui_alert()

        if choice == "3" or choice == "4":
            demo_hospital_rating()

        if choice not in ["1", "2", "3", "4"]:
            print("\n❌ Invalid choice. Running all demos...")
            demo_route_finding()
            demo_hospital_rating()

    except KeyboardInterrupt:
        print("\n\n👋 Demo cancelled by user.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback

        traceback.print_exc()


def demo_route_finding():
    """Demonstrate route finding and map generation."""
    print("\n" + "=" * 70)
    print("📍 DEMO 1: Route Finding & Map Generation")
    print("=" * 70)

    emergency = EmergencyResponseSystem()

    # Use Chennai, India coordinates (where the dataset hospitals are)
    accident_lat = 13.074
    accident_lon = 80.24

    print(f"\n🎯 Accident Location: {accident_lat}, {accident_lon}")
    print("\n⚡ Speed Options:")
    print("   1. FAST MODE (recommended) - Instant results, straight-line distance")
    print("   2. FULL MODE - Accurate road routing, but slow (30-60 seconds)")
    print("\nEnter choice (1 or 2, default=1): ", end="")

    try:
        choice = input().strip() or "1"
        use_fast_mode = choice != "2"

        if use_fast_mode:
            print("\n⚡ Using FAST MODE (instant results)...\n")
        else:
            print("\n⏳ Using FULL MODE (downloading road network - may take 30-60 seconds)...\n")

        response = emergency.handle_accident(
            accident_lat=accident_lat, accident_lon=accident_lon, generate_map=True, fast_mode=use_fast_mode
        )

        if response["success"]:
            print("✅ SUCCESS! Route found and map generated!")
            print("\n" + "-" * 70)
            print("📊 RESULTS:")
            print("-" * 70)
            print(f"Accident ID: {response['accident_id']}")
            print("\n🏥 Selected Hospital:")
            print(f"   Name: {response['selected_hospital']['name']}")
            print(f"   Rating: {response['selected_hospital']['star_rating']:.1f}/5.0 ⭐")
            print(f"   Address: {response['selected_hospital'].get('address', 'N/A')}")
            print(f"   Phone: {response['selected_hospital'].get('phone', 'N/A')}")

            print("\n🗺️  Route Information:")
            print(f"   Distance: {response['route']['distance_km']:.2f} km")
            print(f"   Map saved to: {response['map_file']}")

            if response.get("alternative_hospitals"):
                print("\n🔄 Alternative Hospitals:")
                for i, alt in enumerate(response["alternative_hospitals"], 1):
                    print(f"   {i}. {alt['name']}")
                    print(f"      Distance: {alt['distance_km']:.2f} km, Rating: {alt['rating']:.1f}/5.0")

            print("\n" + "-" * 70)
            print("💡 TIP: Open the map file in your browser to see the route visualization!")
            print(f"   File: {os.path.abspath(response['map_file'])}")
            print("-" * 70)

        else:
            print(f"❌ Error: {response.get('error', 'Unknown error')}")
            print("\n💡 Make sure you have an internet connection (road network data is downloaded)")

    except Exception as e:
        print(f"❌ Error during route finding: {e}")
        print("\n💡 Common issues:")
        print("   - No internet connection (required for road network data)")
        print("   - places_dataset.csv file missing")
        print("   - OSMnx package not installed")


def demo_gui_alert():
    """Demonstrate GUI alert with route finding."""
    print("\n" + "=" * 70)
    print("🖥️  DEMO 2: GUI Alert with Route Finding")
    print("=" * 70)
    print("\n⏳ Opening GUI alert window...")
    print("   Click 'View Route Map' button to see route finding in action!")

    # Use Chennai coordinates
    show_enhanced_gui_alert(
        accident_lat=13.074, accident_lon=80.24, accident_location_name="Chennai - Highway 101, KM 45"
    )

    print("✅ GUI alert demo completed!")


def demo_hospital_rating():
    """Demonstrate hospital rating system."""
    print("\n" + "=" * 70)
    print("⭐ DEMO 3: Hospital Rating System")
    print("=" * 70)

    emergency = EmergencyResponseSystem()

    # Example: Record some treatment outcomes
    print("\n📝 Recording sample treatment outcomes...")

    sample_hospital = "HAPPY MOM-Pregnancy to Motherhood"

    # Record a successful case
    emergency.record_treatment_outcome(
        accident_id="demo_accident_1",
        hospital_name=sample_hospital,
        patient_outcome="successful",
        quality_score=90.0,
        response_time_minutes=10.5,
        treatment_notes="Excellent emergency response, patient recovered fully",
    )
    print(f"   ✅ Recorded successful case for {sample_hospital}")

    # Record another successful case
    emergency.record_treatment_outcome(
        accident_id="demo_accident_2",
        hospital_name=sample_hospital,
        patient_outcome="successful",
        quality_score=85.0,
        response_time_minutes=12.0,
        treatment_notes="Good response time, quality treatment",
    )
    print("   ✅ Recorded another successful case")

    # Record a partial success
    emergency.record_treatment_outcome(
        accident_id="demo_accident_3",
        hospital_name=sample_hospital,
        patient_outcome="partial",
        quality_score=70.0,
        response_time_minutes=18.0,
        treatment_notes="Delayed response, but effective treatment",
    )
    print("   ✅ Recorded partial success case")

    # Get and display rating
    print("\n📊 Hospital Performance Report:")
    print("-" * 70)

    performance = emergency.get_hospital_performance_report(sample_hospital)

    if performance:
        print(f"Hospital: {performance['hospital_name']}")
        print(f"Current Rating: {performance['current_rating']:.1f}/5.0 ⭐")
        print(f"Total Cases: {performance['total_cases']}")
        print(f"Success Rate: {performance['success_rate_percent']:.1f}%")
        print(f"Average Response Time: {performance['average_response_time_minutes']:.1f} minutes")
        print(f"Average Quality Score: {performance['average_quality_score']:.1f}/100")
    else:
        print(f"Hospital '{sample_hospital}' not found")

    # Show top hospitals
    print("\n🏆 Top Performing Hospitals:")
    print("-" * 70)

    top_hospitals = emergency.get_top_performing_hospitals(limit=5)

    if top_hospitals:
        for i, hospital in enumerate(top_hospitals, 1):
            print(f"{i}. {hospital['hospital_name']}")
            print(f"   ⭐ Rating: {hospital['current_rating']:.1f}/5.0")
            print(f"   📊 Cases: {hospital['total_cases']}, Success: {hospital['success_rate_percent']:.1f}%")
            print(f"   ⏱️  Avg Response: {hospital['average_response_time_minutes']:.1f} min")
            print()
    else:
        print("   No hospitals with case history yet")

    print("-" * 70)


if __name__ == "__main__":
    main()
