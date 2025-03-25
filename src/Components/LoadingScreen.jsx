import React from "react";
import { motion } from "framer-motion";
import "/src/styles/LoadingScreen.css";

const quotes = [
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "The best way out is always through.", author: "Robert Frost" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "If you’re going through hell, keep going.", author: "Winston Churchill" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "Do something today your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "Success isn’t always about greatness. It’s about consistency.", author: "Dwayne Johnson" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { text: "A champion is someone who gets up when he can’t.", author: "Jack Dempsey" }
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="spinner" />
      <p className="loading-quote">“{randomQuote.text}”</p>
      <p className="loading-author">– {randomQuote.author}</p>
    </motion.div>
  );
}

export default LoadingScreen;
