using GymTracker.Models;

namespace GymTracker.Repositories.Interfaces
{
    public interface IWorkoutRepository
    {
        Workout Add(Workout workout);
        IEnumerable<Workout> GetAllForUser(int userId);
    }
}
