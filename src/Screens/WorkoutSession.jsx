import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { saveWorkoutLog } from "../utils/storage.js";
import { workouts as allWorkouts } from "../data/workouts";
import "../styles/WorkoutSessions.css";

function WorkoutSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "All";

  const filteredWorkouts =
    filter === "All"
      ? allWorkouts
      : allWorkouts.filter(workout => workout.tags.includes(filter));

  const [formData, setFormData] = useState(() => {
    return filteredWorkouts.map(workout => ({
      name: workout.name,
      sets: Array.from({ length: workout.rounds }, () => ({
        weight: workout.weight || "",
        reps: workout.reps || "",
        completed: false
      }))
    }));
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [width, height] = useWindowSize();

  const handleSetChange = (i, j, key, value) => {
    const updated = [...formData];
    updated[i].sets[j][key] = key === "completed" ? value.target.checked : value;
    setFormData(updated);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];
    saveWorkoutLog(today, formData);

    const audio = new Audio("/sounds/success.mp3"); // Make sure this file exists in /public/sounds/
    audio.play();

    setShowConfetti(true);
    setShowBanner(true);

    setTimeout(() => {
      setShowConfetti(false);
      setShowBanner(false);
      navigate("/stats");
    }, 3000);
  };

  if (filteredWorkouts.length === 0) {
    return (
      <div className="session-container">
        <p>No workouts found for this category.</p>
      </div>
    );
  }

  return (
    <div className="session-container">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={3000}
          recycle={false}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      {showBanner && (
        <>
        <div className="workout-overlay" />
        <div className="workout-banner">
          🎉 Way to go! 🎉 
        </div>
        </>
      )}

      <h2>📝 Start Workout - {filter}</h2>
      {formData.map((exercise, i) => (
        <div key={i} className="session-exercise">
          <h3>{exercise.name}</h3>
          {exercise.sets.map((set, j) => (
            <div key={j} className="session-set">
              <div className="session-set-label">Set {j + 1}</div>
              <div className="session-set-fields">
                <input
                  type="text"
                  value={set.weight}
                  onChange={(e) => handleSetChange(i, j, "weight", e.target.value)}
                  placeholder="Weight"
                  className="input-field"
                />
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) => handleSetChange(i, j, "reps", e.target.value)}
                  placeholder="Reps"
                  className="input-field"
                />
                <input
                  type="checkbox"
                  checked={set.completed}
                  onChange={(e) => handleSetChange(i, j, "completed", e)}
                  className="checkbox-field"
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      <button className="save-btn" onClick={handleSave}>
        ✅ Save Workout
      </button>
    </div>
  );
}

export default WorkoutSession;
