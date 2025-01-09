using GymTracker.Models;

namespace GymTracker.Services.Interfaces
{
    public interface IStatisticsService
    {
        Progress GetProgress(int userId, int month, int year);
    }
}
