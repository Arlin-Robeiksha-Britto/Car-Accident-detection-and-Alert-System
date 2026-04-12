"""
Post-stabilization star rating and performance score for the hospital.
After the patient is stabilized and life is saved, generate rating based on:
- Response speed (response_time_minutes)
- Treatment outcome (successful / partial / unsuccessful)
- Patient feedback (quality_score 0-100, treatment_notes).
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


def record_outcome_and_update_rating(
    accident_id: str,
    hospital_name: str,
    patient_outcome: str,
    quality_score: float,
    response_time_minutes: float,
    treatment_notes: str = "",
):
    """Record treatment outcome and update hospital star rating and performance score. Call this after patient is
    stabilized.

    Args:
        accident_id: Same ID as when accident was detected (e.g. accident_20260130_115150)
        hospital_name: Name of hospital that treated the patient
        patient_outcome: 'successful' | 'partial' | 'unsuccessful'
        quality_score: 0-100 (treatment quality / patient feedback)
        response_time_minutes: Time from alert to treatment (response speed)
        treatment_notes: Optional patient feedback text
    """
    from emergency_response_system import EmergencyResponseSystem

    system = EmergencyResponseSystem(use_t_nagar_24x7=True)
    ok = system.record_treatment_outcome(
        accident_id=accident_id,
        hospital_name=hospital_name,
        patient_outcome=patient_outcome,
        quality_score=quality_score,
        response_time_minutes=response_time_minutes,
        treatment_notes=treatment_notes,
    )
    if ok:
        report = system.get_hospital_performance_report(hospital_name)
        print("Updated hospital rating:")
        print("  Star rating:", report.get("current_rating"))
        print("  Success rate:", report.get("success_rate_percent"), "%")
        print("  Avg response time:", report.get("average_response_time_minutes"), "min")
    return ok


if __name__ == "__main__":
    # Example: after patient stabilized
    # python post_stabilization_rating.py accident_20260130_115150 "SIMS Hospitals" successful 85 12 "Quick and effective."
    if len(sys.argv) >= 6:
        accident_id = sys.argv[1]
        hospital_name = sys.argv[2]
        patient_outcome = sys.argv[3]  # successful | partial | unsuccessful
        quality_score = float(sys.argv[4])
        response_time_minutes = float(sys.argv[5])
        treatment_notes = sys.argv[6] if len(sys.argv) > 6 else ""
        record_outcome_and_update_rating(
            accident_id, hospital_name, patient_outcome, quality_score, response_time_minutes, treatment_notes
        )
    else:
        print(
            "Usage: python post_stabilization_rating.py <accident_id> <hospital_name> <successful|partial|unsuccessful> <quality_score 0-100> <response_time_minutes> [treatment_notes]"
        )
