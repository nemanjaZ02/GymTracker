namespace GymTracker.Models
{
    public class Progress
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public List<WeekProgress> WeeklyProgress { get; set; }
    }

    public class WeekProgress
    {
        public int Week { get; set; }
        public WorkoutStatistics Statistics { get; set; }
    }

    public class WorkoutStatistics
    {
        public double TotalDuration { get; set; }
        public int TotalWorkouts { get; set; }
        public double AverageIntensity { get; set; }
        public double AverageFatigue { get; set; }
    }
}
