using GymTracker.Models;
using GymTracker.Repositories.Interfaces;
using GymTracker.Services.Interfaces;

namespace GymTracker.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IWorkoutRepository _workoutRepository;

        public StatisticsService(IWorkoutRepository workoutRepository)
        {
            _workoutRepository = workoutRepository;
        }

        public Progress GetProgress(int userId, int month, int year)
        {
            var workouts = _workoutRepository.GetByMonth(userId, month, year);

            var weeklyProgress = new List<WeekProgress>();

            for (int week = 1; week <= 4; week++)
            {
                var weeklyWorkouts = workouts.Where(w => GetWeekOfMonth(w.Date) == week).ToList();

                if (weeklyWorkouts.Any())
                {
                    var totalDuration = weeklyWorkouts.Sum(w => w.Duration);
                    var totalWorkouts = weeklyWorkouts.Count;
                    var averageIntensity = weeklyWorkouts.Average(w => w.Intensity);
                    var averageFatigue = weeklyWorkouts.Average(w => w.Fatigue);

                    WorkoutStatistics workoutStatistics = new WorkoutStatistics
                    {
                        TotalDuration = totalDuration,
                        TotalWorkouts = totalWorkouts,
                        AverageIntensity = averageIntensity,
                        AverageFatigue = averageFatigue
                    };

                    weeklyProgress.Add(new WeekProgress
                    {
                        Week = week,
                        Statistics = workoutStatistics
                    });
                }
            }

            return new Progress
            {
                Month = month,
                Year = year,
                WeeklyProgress = weeklyProgress
            };
        }

        private int GetWeekOfMonth(DateTime date)
        {
            var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            int firstDayOfWeek = (int)firstDayOfMonth.DayOfWeek;
            if (firstDayOfWeek == 0)
            {
                firstDayOfWeek = 7;
            }
            int dayDifference = date.Day + firstDayOfWeek - 1;
            return (dayDifference + 6) / 7;
        }
    }
}
