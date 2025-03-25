import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useWindowSize } from "@react-hook/window-size";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/DailyChallenge.css";
import { getRandomChallenge } from "../data/workouts";

function DailyChallenge() {
  const [challenge, setChallenge] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hideBox, setHideBox] = useState(false);
  const [ready, setReady] = useState(false); // wait to mount until loaded
  const [width, height] = useWindowSize();

  useEffect(() => {
    const savedDate = localStorage.getItem("daily_challenge_date");
    const today = new Date().toDateString();

    if (savedDate !== today) {
      const newChallenge = getRandomChallenge();
      localStorage.setItem("daily_challenge", newChallenge);
      localStorage.setItem("daily_challenge_date", today);
      localStorage.removeItem("daily_challenge_status");
      setChallenge(newChallenge);
      setCompleted(false);
      setHideBox(false);
    } else {
      const savedChallenge = localStorage.getItem("daily_challenge") || getRandomChallenge();
      setChallenge(savedChallenge);
      const isCompleted = localStorage.getItem("daily_challenge_status") === "completed";
      setCompleted(isCompleted);
      if (isCompleted) setHideBox(true);
    }

    // Delay showing for smooth animation order
    const timer = setTimeout(() => setReady(true), 150); // slight delay
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem("daily_challenge_status", "completed");
    localStorage.setItem("daily_challenge_date", new Date().toDateString());

    setTimeout(() => {
      setShowConfetti(false);
      setHideBox(true);
    }, 3000);
  };

  return (
    <>
      {showConfetti &&
        createPortal(
          <Confetti
            width={width}
            height={height}
            numberOfPieces={1000}
            recycle={false}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
          />,
          document.body
        )}

      <AnimatePresence>
        {ready && !hideBox && (
          <motion.div
            className="daily-challenge-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
          >
            <h2 className="daily-challenge-title">Daily Challenge</h2>
            <label className="inline-challenge">
              <span className="inline-text">"{challenge}"</span>
              <input
                type="checkbox"
                onChange={handleComplete}
                checked={completed}
                disabled={completed}
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DailyChallenge;
