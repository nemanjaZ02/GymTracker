using GymTracker.Dtos;
using GymTracker.Models;
using GymTracker.Services;
using GymTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymTracker.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                AuthenticationTokenDto token = _userService.Register(user);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] CredentialsDto credentials)
        {
            try
            {
                AuthenticationTokenDto token = _userService.Login(credentials.Email, credentials.Password);
                return Ok(token);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }
        }
    }
}
