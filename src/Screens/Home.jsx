import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../Components/AppButton";
import { IoBarbellOutline, IoFitnessOutline, IoTrophyOutline } from "react-icons/io5";
import { FaDumbbell } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "/src/styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const workouts = [
        { name: "Back", icon: <IoBarbellOutline />, color: "#FFD700", filter: "Back" },
        { name: "Chest", icon: <FaDumbbell />, color: "#FF6347", filter: "Chest" },
        { name: "Legs", icon: <IoBarbellOutline />, color: "#4CAF50", filter: "Legs" },
        { name: "Full Body", icon: <FaDumbbell />, color: "#1E90FF", filter: "Full Body" }
    ];

    const [greeting, setGreeting] = useState("");
    const [quote, setQuote] = useState("");

    // Simulated user stats
    const userStats = {
        streak: 5, // Days in a row
        goalCompletion: 65, // Percentage of weekly goal
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning! ☀️");
        else if (hour < 18) setGreeting("Good afternoon! 🌤️");
        else setGreeting("Good evening! 🌙");

        // Random motivational quotes
        const quotes = [
            "Push yourself, because no one else will do it for you.",
            "Sweat today, shine tomorrow.",
            "Your body can stand almost anything, it's your mind you have to convince.",
            "Stronger every day."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    return (
        <motion.div 
            className="home-container"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Header */}
            <header className="home-header">
                <h1>{greeting}</h1>
                <p>{quote}</p>
            </header>

            {/* Quick Action Buttons */}
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

            {/* Workout Selection Grid */}
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
                        onClick={() => navigate(`/workouts?filter=${encodeURIComponent(workout.filter)}`)}
                    >
                        <div className="workout-icon">{workout.icon}</div>
                        <h3>{workout.name}</h3>
                    </motion.div>
                ))}
            </motion.section>

            {/* Streak & Goal Progress */}
            <section className="progress-section">
                <div className="progress-item">
                    <CircularProgressbar
                        value={userStats.goalCompletion}
                        text={`${userStats.goalCompletion}%`}
                        styles={buildStyles({
                            textColor: "black",
                            pathColor: "black",
                            trailColor: "#ddd",
                        })}
                    />
                    <p>Goal Completion</p>
                </div>
                <div className="progress-item">
                    <IoTrophyOutline className="streak-icon" />
                    <h2>{userStats.streak}🔥</h2>
                    <p>Day Streak</p>
                </div>
            </section>

            {/* Daily Challenge */}
            <section className="daily-challenge">
                <h2>💪 Daily Challenge</h2>
                <p>Do 50 push-ups today! Can you complete it?</p>
            </section>
        </motion.div>
    );
}

export default Home;
