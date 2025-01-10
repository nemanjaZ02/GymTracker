using GymTracker.Dtos;
using GymTracker.Models;

namespace GymTracker.Services.Interfaces
{
    public interface IUserService
    {
        AuthenticationTokenDto Register(User user);
        AuthenticationTokenDto Login(string email, string password);
    }
}
