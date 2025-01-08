using GymTracker.Models;

namespace GymTracker.Services.Interfaces
{
    public interface IWorkoutService
    {
        Workout Add(Workout workout);
        IEnumerable<Workout> GetAllForUser(int userId);
    }
}
