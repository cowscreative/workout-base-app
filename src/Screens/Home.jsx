// src/Screens/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../Components/AppButton";
import { IoBarbellOutline, IoFitnessOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { getRandomChallenge, workouts as allWorkouts } from "../data/workouts.js";
import { getWorkoutLogs } from "../utils/storage.js";
import WaterTracker from "../Components/WaterTracker";
import DailyChallenge from "../Components/DailyChallenge";
import Confetti from "react-confetti";
import "react-circular-progressbar/dist/styles.css";
import "/src/styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({ workoutsCompleted: 0, totalWeight: 0 });
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name") || "";
    setName(storedName);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    const baseGreeting =
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    setGreeting(`${baseGreeting}${name ? `, ${name}` : ""}!`);
  }, [name]);

  useEffect(() => {
    const quotes = [
      "Push yourself, because no one else will do it for you.",
      "Sweat today, shine tomorrow.",
      "Your body can stand almost anything, it's your mind you have to convince.",
      "Stronger every day."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const lime = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-lime")
      .trim();

    setWorkouts([
      { name: "Push", color: lime, filter: "Push" },
      { name: "Pull", color: lime, filter: "Pull" },
      { name: "Legs", color: lime, filter: "Legs" },
      { name: "Full Body", color: lime, filter: "Full Body" }
    ]);

    const storedLogs = getWorkoutLogs();
    const logEntries = Object.entries(storedLogs);

    const partiallyCompletedExercises = logEntries.reduce((total, [, exercises]) => {
      exercises.forEach((ex) => {
        const hasCompletedSet = ex.sets.some((set) => set.completed);
        if (hasCompletedSet) total += 1;
      });
      return total;
    }, 0);

    const totalWeightLifted = logEntries.reduce((total, [, exercises]) => {
      exercises.forEach((ex) => {
        ex.sets.forEach((set) => {
          if (set.completed) {
            const weight = parseFloat(set.weight);
            const reps = parseInt(set.reps);
            if (!isNaN(weight) && !isNaN(reps)) {
              total += weight * reps;
            }
          }
        });
      });
      return total;
    }, 0);

    setStats({
      workoutsCompleted: partiallyCompletedExercises,
      totalWeight: totalWeightLifted
    });
  }, []);

  const handleChallengeCheck = () => {
    setChallengeCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {showConfetti && <Confetti />}

      {/* Greeting */}
      <header className="home-header">
        <h1>{greeting}</h1>
        <p>{quote}</p>
      </header>

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Workout Type Grid */}
      <motion.section
        className="workout-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {workouts.map((workout, index) => (
          <motion.div
            key={index}
            className="workout-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: workout.color }}
            onClick={() =>
              navigate(`/workouts?filter=${encodeURIComponent(workout.filter)}`)
            }
          >
            <h2>{workout.name}</h2>
          </motion.div>
        ))}
      </motion.section>

      {/* Water Tracker */}
      <section className="water-section">
        <WaterTracker />
      </section>

      {/* Action Buttons */}
      <motion.div
        className="quick-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <AppButton className="action-btn" onClick={() => navigate("/workouts")}>
          <IoFitnessOutline className="action-icon" />
          Start Workout
        </AppButton>
        <AppButton className="action-btn secondary" onClick={() => navigate("/stats")}>
          <IoBarbellOutline className="action-icon" />
          View Stats
        </AppButton>
      </motion.div>

      <h3 className="padding-above">Workout History</h3>

      {/* Stats Preview */}
      <section className="home-stats">
        <div className="stats-card">
          <h3>{stats.workoutsCompleted}</h3>
          <p>Workouts Completed</p>
        </div>
        <div className="stats-card">
          <h3>{stats.totalWeight.toLocaleString()} lbs</h3>
          <p>Total Weight Lifted</p>
        </div>
      </section>
    </motion.div>
  );
}

export default Home;
