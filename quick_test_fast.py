"""
Quick Fast Test - Uses fast mode (no slow road network download)
Run this for instant results!
"""

from emergency_response_system import EmergencyResponseSystem

print("=" * 70)
print("⚡ FAST MODE DEMO - No Road Network Download")
print("=" * 70)
print("\nThis uses straight-line distance for instant results!")
print("(For actual road routing, use fast_mode=False - but it's slower)\n")

emergency = EmergencyResponseSystem()

# Use Chennai, India coordinates
accident_lat = 13.074
accident_lon = 80.24

print(f"🎯 Accident Location: {accident_lat}, {accident_lon}")
print("⏳ Finding hospitals... (fast mode - instant!)\n")

try:
    # Use fast_mode=True for instant results
    response = emergency.handle_accident(
        accident_lat=accident_lat,
        accident_lon=accident_lon,
        generate_map=True,
        fast_mode=True,  # ⚡ Fast mode - no slow downloads!
    )

    if response["success"]:
        print("✅ SUCCESS!\n")
        print(f"Hospital: {response['selected_hospital']['name']}")
        print(f"Rating: {response['selected_hospital']['star_rating']:.1f}/5.0 ⭐")
        print(f"Distance: {response['route']['distance_km']:.2f} km")
        if response["route"].get("note"):
            print(f"Note: {response['route']['note']}")
        print(f"\nMap: {response['map_file']}")
        print("\n💡 Map shows straight-line route (for actual road routing, use fast_mode=False)")
    else:
        print(f"❌ Error: {response.get('error')}")

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback

    traceback.print_exc()
