using GymTracker.Models;

namespace GymTracker.Services.Interfaces
{
    public interface IUserService
    {
        bool Register(User user);      
        string Login(string email, string password);
    }
}
