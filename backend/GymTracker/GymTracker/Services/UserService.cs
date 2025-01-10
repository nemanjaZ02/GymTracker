using GymTracker.Dtos;
using GymTracker.Models;
using GymTracker.Repositories.Interfaces;
using GymTracker.Services.Interfaces;

namespace GymTracker.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenGenerator _tokenGenerator;

        public UserService(IUserRepository userRepository, ITokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public AuthenticationTokenDto Login(string email, string password)
        {
            var user = _userRepository.GetByEmail(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            AuthenticationTokenDto token = new AuthenticationTokenDto();
            token.AccessToken = _tokenGenerator.GenerateJwtToken(user.Id, user.Username, user.Email);
            return token;
        }

        public AuthenticationTokenDto Register(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
                throw new Exception("Username, email and password are required");

            var existingUserByUsername = _userRepository.GetByUsername(user.Username);
            if (existingUserByUsername != null)
                throw new Exception("Username is already taken");

            var existingUserByEmail = _userRepository.GetByEmail(user.Email);
            if (existingUserByEmail != null)
                throw new Exception("Email is already taken");

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _userRepository.Add(user);
            AuthenticationTokenDto token = new AuthenticationTokenDto();
            token.AccessToken = _tokenGenerator.GenerateJwtToken(user.Id, user.Username, user.Email);
            return token;
        }
    }
}
