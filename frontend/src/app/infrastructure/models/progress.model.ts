export interface Progress {
  month: number;
  year: number;
  weeklyProgress: WeekProgress[];
}

export interface WeekProgress {
  week: number;
  statistics: WorkoutStatistics;
}

export interface WorkoutStatistics {
  totalDuration: number;
  totalWorkouts: number;
  averageIntensity: number;
  averageFatigue: number;
}