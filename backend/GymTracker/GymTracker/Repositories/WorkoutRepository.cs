using GymTracker.Models;
using GymTracker.Repositories.Interfaces;

namespace GymTracker.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly AppDbContext _context;

        public WorkoutRepository(AppDbContext context)
        {
            _context = context;
        }

        public Workout Add(Workout workout)
        {
            _context.Workouts.Add(workout);
            _context.SaveChanges();
            return workout;
        }

        public IEnumerable<Workout> GetAllForUser(int userId)
        {
            return _context.Workouts.Where(w => w.UserId == userId).ToList();
        }
    }
}
