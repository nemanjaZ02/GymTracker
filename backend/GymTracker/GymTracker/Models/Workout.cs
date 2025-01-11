using System.ComponentModel.DataAnnotations;

namespace GymTracker.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required(ErrorMessage = "Date is required.")]
        public DateTime Date { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Duration must be greater than 0.")]
        public double Duration { get; set; }
        [Required(ErrorMessage = "Type is required.")]
        public WorkoutType Type { get; set; }
        [MaxLength(500, ErrorMessage = "Notes cannot exceed 500 characters.")]
        public string Notes { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Calories burned cannot be negative.")]
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
