import { motion } from "framer-motion";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import "/src/styles/Profile.css";

function Profile() {
    // Example user data (can be fetched dynamically later)
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        profilePicture: "https://via.placeholder.com/100", // Replace with real image
        workoutStreak: 5, // Days in a row
        totalWorkouts: 25,
    };

    return (
        <motion.div 
            className="profile-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        ><h1>Howdy {user.name}</h1>
            {/* Profile Header */}
            <motion.header 
                className="profile-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.img 
                    src={user.profilePicture} 
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
                    <h2>{user.workoutStreak}</h2>
                    <p>Day Streak</p>
                </motion.div>
                <motion.div 
                    className="stat-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>{user.totalWorkouts}</h2>
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
                >
                    <FaUserEdit className="action-icon" />
                    Edit Profile
                </motion.button>
                <motion.button 
                    className="profile-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoSettingsOutline className="action-icon" />
                    Settings
                </motion.button>
                <motion.button 
                    className="profile-btn logout"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoLogOutOutline className="action-icon" />
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Profile;
