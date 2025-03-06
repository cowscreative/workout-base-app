import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "/src/styles/Stats.css";

function Stats() {
    // Example stats (could be fetched dynamically later)
    const stats = {
        workoutsCompleted: 8,
        caloriesBurned: 2400,
        goalCompletion: 75, // Percentage
        workoutStreak: 4, // Days in a row
    };

    return (
        <motion.div 
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Header */}
            <motion.header 
                className="stats-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h1>📊 Workout Stats</h1>
                <p>Track your progress & stay motivated!</p>
            </motion.header>

            {/* Stats Overview */}
            <motion.div 
                className="stats-overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <motion.div 
                    className="stats-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>{stats.workoutsCompleted}</h2>
                    <p>Workouts Completed</p>
                </motion.div>
                <motion.div 
                    className="stats-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>{stats.caloriesBurned}</h2>
                    <p>Calories Burned</p>
                </motion.div>
            </motion.div>

            {/* Progress Circles */}
            <motion.div 
                className="progress-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <motion.div 
                    className="progress-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <CircularProgressbar
                        value={stats.goalCompletion}
                        text={`${stats.goalCompletion}%`}
                        styles={buildStyles({
                            textColor: "black",
                            pathColor: "black",
                            trailColor: "#ddd",
                        })}
                    />
                    <p>Goal Completion</p>
                </motion.div>
                <motion.div 
                    className="progress-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <CircularProgressbar
                        value={(stats.workoutStreak / 7) * 100}
                        text={`${stats.workoutStreak} Days`}
                        styles={buildStyles({
                            textColor: "black",
                            pathColor: "black",
                            trailColor: "#ddd",
                        })}
                    />
                    <p>Workout Streak</p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Stats;
