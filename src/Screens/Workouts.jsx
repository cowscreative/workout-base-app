import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircleOutline, IoCloseOutline } from "react-icons/io5";
import { IoBarbellOutline, IoPulseOutline, IoFitnessOutline } from "react-icons/io5";
import { FaDumbbell, FaRunning } from "react-icons/fa";
import { workoutFilters, workouts as allWorkouts } from "/src/data/workouts";
import "/src/styles/Workouts.css";

// Function to get the correct icon based on category
const getIcon = (category) => {
    const categoryIcons = {
        Back: <IoBarbellOutline />,  // Barbell for Back Workouts
        Chest: <FaDumbbell />,       // Dumbbell for Chest Workouts
        Legs: <FaRunning />,         // Running icon for Leg Workouts
        "Full Body": <IoFitnessOutline /> // Fitness icon for Full Body Workouts
    };

    return categoryIcons[category] || <IoBarbellOutline />; // Default to barbell
};

function Workouts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterFromURL = queryParams.get("filter") || "All";

    const [selectedFilter, setSelectedFilter] = useState(filterFromURL);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        setSelectedFilter(filterFromURL);
    }, [filterFromURL]);

    const closeModal = () => {
        setSelectedWorkout(null);
    };

    // Close modal when clicking outside
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("modal-overlay")) {
            closeModal();
        }
    };

    // Filter workouts based on selected category
    const filteredWorkouts = selectedFilter === "All"
        ? allWorkouts
        : allWorkouts.filter(workout => workout.tags.includes(selectedFilter));

    return (
        <motion.div
            className="workouts-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h2>💪 Choose Your Workout</h2>

            {/* Filters (Matching Homepage) */}
            <div className="filter-container">
                {workoutFilters.map((filter) => (
                    <button
                        key={filter}
                        className={`filter-pill ${selectedFilter === filter ? "active" : ""}`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Workout List */}
            <motion.div
                className="workouts-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {filteredWorkouts.map((workout, index) => (
                    <motion.div
                        key={index}
                        className="workout-item"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedWorkout(workout)}
                    >
                        <div className="workout-icon">{getIcon(workout.category)}</div>
                        <div className="workout-info">
                            <h3>{workout.name}</h3>
                            <p className="workout-details">
                                {`${workout.weight} lbs • ${workout.reps} reps • ${workout.rounds} rounds`}
                            </p>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${workout.progress}%` }}
                            ></div>
                        </div>
                        {workout.progress === 100 && <IoCheckmarkCircleOutline className="check-icon" />}
                    </motion.div>
                ))}
            </motion.div>

            {/* Workout Details Bottom Sheet with Click-Outside Close */}
            <AnimatePresence>
                {selectedWorkout && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleOutsideClick} // Click outside to close
                    >
                        <motion.div 
                            className="workout-bottom-sheet"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 100 }}
                            dragElastic={0.2}
                            onDragEnd={(event, info) => {
                                if (info.offset.y > 100) closeModal(); // Close on downward swipe
                            }}
                        >
                            {/* FIX: Make sure "X" button is always rendered */}
                            <div className="modal-header">
                                <button className="close-btn" onClick={closeModal}>
                                    <IoCloseOutline />
                                </button>
                            </div>

                            <div className="workout-sheet-content">
                                <div className="workout-icon">{getIcon(selectedWorkout.category)}</div>
                                <h2>{selectedWorkout.name}</h2>
                                <p><strong>Category:</strong> {selectedWorkout.category}</p>
                                <p><strong>Tags:</strong> {selectedWorkout.tags.join(", ")}</p>
                                <p><strong>Weight:</strong> {selectedWorkout.weight} lbs</p>
                                <p><strong>Reps:</strong> {selectedWorkout.reps}</p>
                                <p><strong>Rounds:</strong> {selectedWorkout.rounds}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Workouts;
