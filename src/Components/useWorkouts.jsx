export function getWorkoutTypes() {
    const lime = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-lime")
      .trim();
  
    return [
      { name: "Push", color: lime, filter: "Push" },
      { name: "Pull", color: lime, filter: "Pull" },
      { name: "Legs", color: lime, filter: "Legs" },
      { name: "Full Body", color: lime, filter: "Full Body" }
    ];
  }
  