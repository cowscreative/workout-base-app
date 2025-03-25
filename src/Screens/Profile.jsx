import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "/src/styles/Profile.css";

function Profile() {
    const [user, setUser] = useState({
        email: "you@example.com",
        user_metadata: {
            name: "Dev User",
            avatar_url: "https://via.placeholder.com/100x100"
        }
    });

    const [workoutStats, setWorkoutStats] = useState({ streak: 0, total: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        // Fake stats for dev mode — replace with real API later
        setWorkoutStats({ streak: 4, total: 36 });
    }, []);

    return (
        <motion.div 
            className="profile-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h1>Howdy {user.user_metadata?.name}</h1>

            <motion.header className="profile-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.img 
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="profile-pic"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                />
                <p>{user.email}</p>
            </motion.header>

            <motion.div 
                className="profile-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <h2>{workoutStats.streak}</h2>
                    <p>Day Streak</p>
                </motion.div>
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <h2>{workoutStats.total}</h2>
                    <p>Total Workouts</p>
                </motion.div>
            </motion.div>

            <motion.div 
                className="profile-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <motion.button 
                    className="profile-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/settings")}
                >
                    <IoSettingsOutline className="action-icon" />
                    Settings
                </motion.button>

                <motion.button 
                    className="profile-btn logout"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Logout is disabled in dev mode")}
                >
                    <IoLogOutOutline className="action-icon" />
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Profile;
