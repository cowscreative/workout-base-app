import { getWorkoutLogs } from "../utils/storage.js";

export function useWorkoutStats() {
  const logs = Object.entries(getWorkoutLogs());
  let completed = 0;
  let weight = 0;

  logs.forEach(([, exercises]) => {
    exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed) {
          const w = parseFloat(set.weight);
          const r = parseInt(set.reps);
          if (!isNaN(w) && !isNaN(r)) {
            weight += w * r;
            completed += 1;
          }
        }
      });
    });
  });

  return { workoutsCompleted: completed, totalWeight: weight };
}
