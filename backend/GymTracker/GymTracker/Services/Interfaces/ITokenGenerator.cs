namespace GymTracker.Services.Interfaces
{
    public interface ITokenGenerator
    {
        string GenerateJwtToken(int userId, string username, string email);
    }
}
