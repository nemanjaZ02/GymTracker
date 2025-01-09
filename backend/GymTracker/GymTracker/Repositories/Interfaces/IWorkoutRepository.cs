using GymTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTracker.Repositories.Interfaces
{
    public interface IWorkoutRepository
    {
        Workout Add(Workout workout);
        IEnumerable<Workout> GetAllForUser(int userId);
        IEnumerable<Workout> GetByMonth(int userId, int month, int year);
    }
}
