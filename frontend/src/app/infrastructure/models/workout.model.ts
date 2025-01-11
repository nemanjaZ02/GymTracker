export interface Workout {
  id: number; 
  userId: number;
  date: string; 
  duration: number;
  type: number;
  notes: string;
  caloriesBurned: number;
  intensity: number;
  fatigue: number;
}
