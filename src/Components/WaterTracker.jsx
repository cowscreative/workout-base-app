import { useState, useEffect } from "react";
import "../styles/WaterTracker.css";

function WaterTracker() {
  const [cups, setCups] = useState(0);

  // Load saved data
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("water-tracker")) || {};
    setCups(saved[today] || 0);
  }, []);

  const handleCupClick = (i) => {
    const today = new Date().toDateString();
    const newCount = i + 1;
    const updated = { ...(JSON.parse(localStorage.getItem("water-tracker")) || {}) };
    updated[today] = newCount;
    localStorage.setItem("water-tracker", JSON.stringify(updated));
    setCups(newCount);
  };

  return (
    <div className="water-tracker">
      <h2>How many glasses of water have you had today?</h2>
      <div className="water-cups">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`cup ${i < cups ? "filled" : ""}`}
            onClick={() => handleCupClick(i)}
          >
            💧
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaterTracker;
