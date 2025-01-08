using System.ComponentModel.DataAnnotations;

namespace GymTracker.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public double Duration { get; set; }
        public WorkoutType Type { get; set; }
        public string Notes { get; set; }
        public double CaloriesBurned { get; set; }

        [Range(1, 10, ErrorMessage = "Intensity must be between 1 and 10.")]
        public int Intensity { get; set; }
        [Range(1, 10, ErrorMessage = "Fatigue must be between 1 and 10.")]
        public int Fatigue { get; set; }
    }

    public enum WorkoutType
    {
        Cardio,
        Strength,
        Flexibility
    }
}
