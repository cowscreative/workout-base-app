export const workoutFilters = ["All", "Chest", "Back", "Legs", "Full Body", "Core"];

export const workouts = [
    // Chest - Monday
    { name: "Bench Press", type: "Strength", icon: "barbell", tags: ["Chest"], weight: "30lbs", reps: 10, rounds: 4 },
    { name: "Incline 5° Press", type: "Strength", icon: "dumbbell", tags: ["Chest"], weight: "20lbs", reps: 10, rounds: 4 },
    { name: "Overhead Press", type: "Strength", icon: "dumbbell", tags: ["Chest"], weight: "15lbs", reps: 10, rounds: 4 },
    { name: "Tricep Extension", type: "Strength", icon: "triceps", tags: ["Chest"], weight: "20lbs", reps: 10, rounds: 4 },
    { name: "Hanging Leg Raises", type: "Core", icon: "core", tags: ["Chest", "Core"], weight: "Bodyweight", reps: 10, rounds: 3 },

    // Back - Tuesday
    { name: "Single Rows", type: "Strength", icon: "dumbbell", tags: ["Back"], weight: "20lbs", reps: 10, rounds: 4 },
    { name: "Lat Pull Down", type: "Machine", icon: "machine", tags: ["Back"], weight: "85lbs", reps: 10, rounds: 4 },
    { name: "Bicep Curls", type: "Strength", icon: "biceps", tags: ["Back"], weight: "12.5lbs", reps: 10, rounds: 4 },
    { name: "Bent Over Dumbbell Rows", type: "Strength", icon: "dumbbell", tags: ["Back"], weight: "15lbs", reps: 10, rounds: 4 },
    { name: "Dumbbell Shrugs", type: "Strength", icon: "dumbbell", tags: ["Back"], weight: "20lbs", reps: 10, rounds: 4 },
    { name: "Bicycles", type: "Core", icon: "core", tags: ["Back", "Core"], weight: "Bodyweight", reps: 100, rounds: 1 },

    // Legs - Wednesday
    { name: "Bike", type: "Cardio", icon: "bike", tags: ["Legs"], weight: "N/A", reps: "2 miles", rounds: "5 min" },
    { name: "Leg Extension Machine", type: "Machine", icon: "machine", tags: ["Legs"], weight: "40lbs", reps: 10, rounds: 4 },
    { name: "Leg Curl", type: "Machine", icon: "machine", tags: ["Legs"], weight: "55lbs", reps: 10, rounds: 4 },
    { name: "Dumbbell Goblet Squats", type: "Strength", icon: "dumbbell", tags: ["Legs"], weight: "Bodyweight", reps: 10, rounds: 4 },
    { name: "Lunges (per leg)", type: "Strength", icon: "legs", tags: ["Legs"], weight: "Bodyweight", reps: 10, rounds: 4 },
    { name: "Ab Wheel", type: "Core", icon: "core", tags: ["Legs", "Core"], weight: "Bodyweight", reps: 10, rounds: 3 },

    // Full Body - Thursday
    { name: "Dumbbell Curl and Overhead Press", type: "Strength", icon: "dumbbell", tags: ["Full Body"], weight: "10lbs", reps: 10, rounds: 4 },
    { name: "Lat Pull Down", type: "Machine", icon: "machine", tags: ["Full Body"], weight: "85lbs", reps: 10, rounds: 4 },
    { name: "Bench Press", type: "Strength", icon: "barbell", tags: ["Full Body"], weight: "30lbs", reps: 10, rounds: 4 },
    { name: "Tricep Extension", type: "Strength", icon: "triceps", tags: ["Full Body"], weight: "20lbs", reps: 10, rounds: 4 },

    // Core - Friday
    { name: "Hanging Leg Raises", type: "Core", icon: "core", tags: ["Core"], weight: "Bodyweight", reps: 10, rounds: 3 },
    { name: "Bicep Curls", type: "Strength", icon: "biceps", tags: ["Core"], weight: "12.5lbs", reps: 10, rounds: 4 },
    { name: "Ab Wheel", type: "Core", icon: "core", tags: ["Core"], weight: "Bodyweight", reps: 10, rounds: 3 },
    { name: "Bicycles", type: "Core", icon: "core", tags: ["Core"], weight: "Bodyweight", reps: 100, rounds: 1 }
];