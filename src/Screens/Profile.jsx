import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "/src/styles/Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [workoutStats, setWorkoutStats] = useState({ streak: 0, total: 0 });
    const navigate = useNavigate();

    // Fetch user data from Supabase
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/login"); // Redirect to login if no user
                return;
            }
            setUser(user);

            // Fetch user's workout stats (adjust table name if different)
            const { data, error } = await supabase
                .from("workouts")
                .select("streak, total")
                .eq("user_id", user.id)
                .single();

            if (data) {
                setWorkoutStats({ streak: data.streak || 0, total: data.total || 0 });
            } else if (error) {
                console.error("Error fetching workout stats:", error);
            }
        };

        fetchUser();
    }, [navigate]);

    // Logout function
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login"); // Redirect to login page
    };

    if (!user) return null; // Prevent rendering if no user is logged in

    return (
        <motion.div 
            className="profile-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h1>Howdy {user.user_metadata?.name || "User"}</h1>

            {/* Profile Header */}
            <motion.header 
                className="profile-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.img 
                    src={user.user_metadata?.avatar_url || "https://via.placeholder.com/100"} 
                    alt="Profile" 
                    className="profile-pic"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                />
                <p>{user.email}</p>
            </motion.header>

            {/* Workout Stats */}
            <motion.div 
                className="profile-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <motion.div 
                    className="stat-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>{workoutStats.streak}</h2>
                    <p>Day Streak</p>
                </motion.div>
                <motion.div 
                    className="stat-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>{workoutStats.total}</h2>
                    <p>Total Workouts</p>
                </motion.div>
            </motion.div>

            {/* Profile Actions */}
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
                    onClick={() => navigate("/settings")} // Navigate to settings
                >
                    <IoSettingsOutline className="action-icon" />
                    Settings
                </motion.button>

                <motion.button 
                    className="profile-btn logout"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout} // Logout functionality
                >
                    <IoLogOutOutline className="action-icon" />
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Profile;
