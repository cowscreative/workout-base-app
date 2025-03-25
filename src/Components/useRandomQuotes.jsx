const quotes = [
    "Push yourself, because no one else will do it for you.",
    "Sweat today, shine tomorrow.",
    "Your body can stand almost anything, it's your mind you have to convince.",
    "Stronger every day."
  ];
  
  export function useRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  