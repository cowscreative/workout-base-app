export function useGreeting(name) {
    const hour = new Date().getHours();
    const base = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    return `${base}${name ? `, ${name}` : ""}!`;
  }
  