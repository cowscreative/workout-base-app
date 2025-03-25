// src/Screens/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../Components/AppButton";
import { IoBarbellOutline, IoFitnessOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import WaterTracker from "../Components/WaterTracker";
import DailyChallenge from "../Components/DailyChallenge";
import { getWorkoutTypes } from "../Components/useWorkouts";
import { useGreeting } from "../Components/useGreetings";
import { useRandomQuote } from "../Components/useRandomQuotes";
import { useWorkoutStats } from "../Components/useWorkoutStats";
import "react-circular-progressbar/dist/styles.css";
import "/src/styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const greeting = useGreeting();
  const quote = useRandomQuote();
  const workouts = getWorkoutTypes();
  const stats = useWorkoutStats();

  useEffect(() => {
    const storedName = localStorage.getItem("user_name") || "";
    setName(storedName);
  }, []);

  const handleChallengeCheck = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const sectionTransition = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <motion.div
      className="home-container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.12,
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.4
          }
        }
      }}
    >
      {showConfetti && <Confetti />}

      <motion.header className="home-header" variants={sectionTransition}>
        <h1>{greeting}{name && `, ${name}`}!</h1>
        <p>{quote}</p>
      </motion.header>

      <motion.div variants={sectionTransition}>
        <DailyChallenge onComplete={handleChallengeCheck} />
      </motion.div>

      <motion.section className="workout-grid" variants={sectionTransition}>
        {workouts.map((workout, index) => (
          <motion.div
            key={index}
            className="workout-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ backgroundColor: workout.color }}
            onClick={() =>
              navigate(`/workouts?filter=${encodeURIComponent(workout.filter)}`)
            }
          >
            <h2>{workout.name}</h2>
          </motion.div>
        ))}
      </motion.section>

      <motion.section className="water-section" variants={sectionTransition}>
        <WaterTracker />
      </motion.section>

      <motion.div className="quick-actions" variants={sectionTransition}>
        <AppButton className="action-btn" onClick={() => navigate("/workouts")}>
          <IoFitnessOutline className="action-icon" />
          Start Workout
        </AppButton>
        <AppButton className="action-btn secondary" onClick={() => navigate("/stats")}>
          <IoBarbellOutline className="action-icon" />
          View Stats
        </AppButton>
      </motion.div>

      <motion.h3 className="padding-above" variants={sectionTransition}>Workout History</motion.h3>

      <motion.section className="home-stats" variants={sectionTransition}>
        <div className="stats-card">
          <h3>{stats.workoutsCompleted}</h3>
          <p>Workouts Completed</p>
        </div>
        <div className="stats-card">
          <h3>{stats.totalWeight.toLocaleString()} lbs</h3>
          <p>Total Weight Lifted</p>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Home;