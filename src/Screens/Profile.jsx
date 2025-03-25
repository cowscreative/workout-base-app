// src/Screens/Profile.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  clearWorkoutLogs,
  clearWaterTracker,
  clearDailyChallenge
} from "/src/utils/storage.js";
import "/src/styles/Profile.css";

function Profile() {
  const [name, setName] = useState("Gibson");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    if (savedName) setName(savedName);
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    localStorage.setItem("user_name", value);
  };

  const clearAll = () => {
    clearWorkoutLogs();
    clearWaterTracker();
    clearDailyChallenge();
    localStorage.removeItem("user_name");
    alert("All stats cleared!");
    window.location.reload();
  };

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="greeting-line">
        Howdy{" "}
        {editing ? (
          <input
            type="text"
            className="name-inline-input"
            value={name}
            onChange={handleNameChange}
            onBlur={() => setEditing(false)}
            autoFocus
          />
        ) : (
          <span className="editable-name" onClick={() => setEditing(true)}>
            {name} <span className="edit-icon">✏️</span>
          </span>
        )}
      </h1>

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
          className="profile-btn warning"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (confirm("Clear today's water and challenge only?")) {
              clearWaterTracker();
              clearDailyChallenge();
              alert("Daily reset complete.");
              window.location.reload();
            }
          }}
        >
          ✅ Clear Daily
        </motion.button>

        <motion.button
          className="profile-btn danger profile-btn logout"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to clear all workouts, name, and stats? This cannot be undone."
              )
            ) {
              clearAll();
            }
          }}
        >
          🗑️ Clear Everything
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
