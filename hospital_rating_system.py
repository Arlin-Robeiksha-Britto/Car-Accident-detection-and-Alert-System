from __future__ import annotations

import sqlite3
from dataclasses import dataclass


@dataclass
class HospitalPerformance:
    """Data class for hospital performance metrics."""

    hospital_name: str
    total_cases: int
    successful_outcomes: int
    average_response_time_minutes: float
    quality_score: float  # 0-100 scale
    current_rating: float  # 0-5 stars

    def calculate_new_rating(self) -> float:
        """Calculate new star rating based on performance metrics Rating formula considers: - Success rate
        (successful_outcomes / total_cases) - Quality score (0-100) - Response time (faster = better).
        """
        if self.total_cases == 0:
            return 2.5  # Default rating for hospitals with no cases

        success_rate = self.successful_outcomes / self.total_cases

        # Normalize response time (assume 60 minutes is average, scale accordingly)
        response_score = max(0, min(100, 100 - (self.average_response_time_minutes / 60.0) * 50))

        # Weighted average:
        # 40% success rate, 35% quality score, 25% response time
        overall_score = success_rate * 0.40 + (self.quality_score / 100.0) * 0.35 + (response_score / 100.0) * 0.25

        # Convert to 0-5 star rating
        new_rating = overall_score * 5.0

        # Round to nearest 0.5
        return round(new_rating * 2) / 2.0


class HospitalRatingSystem:
    """Manages dynamic star ratings for hospitals Ratings increase/decrease based on actual performance metrics.
    """

    def __init__(self, db_path: str = "hospital_ratings.db"):
        self.db_path = db_path
        self.init_database()

    def init_database(self):
        """Initialize SQLite database with hospital rating tables."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Hospital info table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS hospitals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                address TEXT,
                latitude REAL,
                longitude REAL,
                phone TEXT,
                current_rating REAL DEFAULT 2.5,
                total_cases INTEGER DEFAULT 0,
                successful_outcomes INTEGER DEFAULT 0,
                total_response_time_minutes REAL DEFAULT 0.0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Case history table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS case_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hospital_id INTEGER,
                accident_id TEXT,
                patient_outcome TEXT,  -- 'successful', 'partial', 'unsuccessful'
                quality_score REAL,  -- 0-100
                response_time_minutes REAL,
                treatment_quality_notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
            )
        """)

        # Rating history table (for tracking rating changes)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS rating_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hospital_id INTEGER,
                old_rating REAL,
                new_rating REAL,
                reason TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
            )
        """)

        conn.commit()
        conn.close()

    def register_hospital(
        self,
        name: str,
        address: str = "",
        latitude: float | None = None,
        longitude: float | None = None,
        phone: str = "",
    ) -> int:
        """Register a new hospital in the system.

        Returns:
            Hospital ID
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            cursor.execute(
                """
                INSERT OR IGNORE INTO hospitals (name, address, latitude, longitude, phone)
                VALUES (?, ?, ?, ?, ?)
            """,
                (name, address, latitude, longitude, phone),
            )

            cursor.execute("SELECT id FROM hospitals WHERE name = ?", (name,))
            result = cursor.fetchone()
            hospital_id = result[0] if result else None

            conn.commit()
            return hospital_id
        except sqlite3.IntegrityError:
            # Hospital already exists, return existing ID
            cursor.execute("SELECT id FROM hospitals WHERE name = ?", (name,))
            result = cursor.fetchone()
            return result[0] if result else None
        finally:
            conn.close()

    def get_hospital_id(self, name: str) -> int | None:
        """Get hospital ID by name."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM hospitals WHERE name = ?", (name,))
        result = cursor.fetchone()
        conn.close()
        return result[0] if result else None

    def record_case_outcome(
        self,
        hospital_name: str,
        accident_id: str,
        patient_outcome: str,
        quality_score: float,
        response_time_minutes: float,
        treatment_notes: str = "",
    ) -> bool:
        """Record a case outcome for a hospital.

        Args:
            hospital_name: Name of the hospital
            accident_id: Unique identifier for the accident case
            patient_outcome: 'successful', 'partial', or 'unsuccessful'
            quality_score: Quality of treatment (0-100)
            response_time_minutes: Time taken to reach and treat patient
            treatment_notes: Optional notes about the treatment

        Returns:
            True if successful, False otherwise
        """
        # Ensure hospital is registered
        hospital_id = self.get_hospital_id(hospital_name)
        if not hospital_id:
            hospital_id = self.register_hospital(hospital_name)

        if not hospital_id:
            return False

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            # Record case in history
            cursor.execute(
                """
                INSERT INTO case_history 
                (hospital_id, accident_id, patient_outcome, quality_score, 
                 response_time_minutes, treatment_quality_notes)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                (hospital_id, accident_id, patient_outcome, quality_score, response_time_minutes, treatment_notes),
            )

            # Update hospital statistics
            is_successful = 1 if patient_outcome == "successful" else 0

            cursor.execute(
                """
                UPDATE hospitals 
                SET total_cases = total_cases + 1,
                    successful_outcomes = successful_outcomes + ?,
                    total_response_time_minutes = total_response_time_minutes + ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            """,
                (is_successful, response_time_minutes, hospital_id),
            )

            # Recalculate and update rating
            self._update_hospital_rating(hospital_id, cursor)

            conn.commit()
            return True
        except Exception as e:
            print(f"Error recording case outcome: {e}")
            conn.rollback()
            return False
        finally:
            conn.close()

    def _update_hospital_rating(self, hospital_id: int, cursor: sqlite3.Cursor):
        """Recalculate and update hospital rating based on all metrics."""
        # Get current hospital statistics
        cursor.execute(
            """
            SELECT name, total_cases, successful_outcomes, 
                   total_response_time_minutes, current_rating
            FROM hospitals WHERE id = ?
        """,
            (hospital_id,),
        )

        result = cursor.fetchone()
        if not result:
            return

        name, total_cases, successful_outcomes, _total_response_time, old_rating = result

        # Calculate average quality score and response time
        cursor.execute(
            """
            SELECT AVG(quality_score), AVG(response_time_minutes)
            FROM case_history WHERE hospital_id = ?
        """,
            (hospital_id,),
        )

        avg_result = cursor.fetchone()
        avg_quality = avg_result[0] if avg_result[0] else 50.0
        avg_response_time = avg_result[1] if avg_result[1] else 60.0

        # Create performance object
        performance = HospitalPerformance(
            hospital_name=name,
            total_cases=total_cases or 0,
            successful_outcomes=successful_outcomes or 0,
            average_response_time_minutes=avg_response_time,
            quality_score=avg_quality,
            current_rating=old_rating or 2.5,
        )

        # Calculate new rating
        new_rating = performance.calculate_new_rating()

        # Update hospital rating
        cursor.execute(
            """
            UPDATE hospitals SET current_rating = ? WHERE id = ?
        """,
            (new_rating, hospital_id),
        )

        # Record rating change in history
        if abs(new_rating - old_rating) >= 0.1:  # Only record if significant change
            reason = f"Updated based on {total_cases} cases: "
            reason += f"{successful_outcomes} successful, "
            reason += f"avg quality {avg_quality:.1f}, "
            reason += f"avg response {avg_response_time:.1f} min"

            cursor.execute(
                """
                INSERT INTO rating_history (hospital_id, old_rating, new_rating, reason)
                VALUES (?, ?, ?, ?)
            """,
                (hospital_id, old_rating, new_rating, reason),
            )

    def get_hospital_rating(self, hospital_name: str) -> dict | None:
        """Get current rating and performance metrics for a hospital."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT id, name, current_rating, total_cases, successful_outcomes,
                   total_response_time_minutes, address, phone
            FROM hospitals WHERE name = ?
        """,
            (hospital_name,),
        )

        result = cursor.fetchone()
        if not result:
            conn.close()
            return None

        hospital_id, name, rating, cases, successful, total_time, address, phone = result

        # Get average quality score
        cursor.execute(
            """
            SELECT AVG(quality_score) FROM case_history WHERE hospital_id = ?
        """,
            (hospital_id,),
        )
        avg_quality = cursor.fetchone()[0] or 50.0

        avg_response_time = (total_time / cases) if cases > 0 else 0.0
        success_rate = (successful / cases * 100) if cases > 0 else 0.0

        conn.close()

        return {
            "hospital_name": name,
            "address": address,
            "phone": phone,
            "current_rating": rating,
            "total_cases": cases,
            "successful_outcomes": successful,
            "success_rate_percent": round(success_rate, 2),
            "average_quality_score": round(avg_quality, 2),
            "average_response_time_minutes": round(avg_response_time, 2),
        }

    def get_top_hospitals(self, limit: int = 10) -> list[dict]:
        """Get top-rated hospitals sorted by rating."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT name, current_rating, total_cases, successful_outcomes,
                   total_response_time_minutes, address, phone
            FROM hospitals
            WHERE total_cases > 0
            ORDER BY current_rating DESC, total_cases DESC
            LIMIT ?
        """,
            (limit,),
        )

        results = []
        for row in cursor.fetchall():
            name, rating, cases, successful, total_time, address, phone = row
            avg_response_time = (total_time / cases) if cases > 0 else 0.0
            success_rate = (successful / cases * 100) if cases > 0 else 0.0

            results.append(
                {
                    "hospital_name": name,
                    "address": address,
                    "phone": phone,
                    "current_rating": rating,
                    "total_cases": cases,
                    "success_rate_percent": round(success_rate, 2),
                    "average_response_time_minutes": round(avg_response_time, 2),
                }
            )

        conn.close()
        return results

    def update_rating_manually(self, hospital_name: str, new_rating: float, reason: str = "") -> bool:
        """Manually update hospital rating (for admin use) Rating changes are still tracked in history.
        """
        hospital_id = self.get_hospital_id(hospital_name)
        if not hospital_id:
            return False

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            # Get old rating
            cursor.execute("SELECT current_rating FROM hospitals WHERE id = ?", (hospital_id,))
            old_rating = cursor.fetchone()[0]

            # Update rating
            cursor.execute(
                """
                UPDATE hospitals SET current_rating = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            """,
                (new_rating, hospital_id),
            )

            # Record in history
            cursor.execute(
                """
                INSERT INTO rating_history (hospital_id, old_rating, new_rating, reason)
                VALUES (?, ?, ?, ?)
            """,
                (hospital_id, old_rating, new_rating, reason or "Manual update"),
            )

            conn.commit()
            return True
        except Exception as e:
            print(f"Error updating rating: {e}")
            conn.rollback()
            return False
        finally:
            conn.close()
