using GymTracker.Models;
using GymTracker.Repositories.Interfaces;
using GymTracker.Services.Interfaces;

namespace GymTracker.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;

        public WorkoutService(IWorkoutRepository workoutRepository)
        {
            _workoutRepository = workoutRepository;
        }

        public Workout Add(Workout workout)
        {
            return _workoutRepository.Add(workout);
        }

        public IEnumerable<Workout> GetAllForUser(int userId)
        {
            return _workoutRepository.GetAllForUser(userId);
        }
    }
}
