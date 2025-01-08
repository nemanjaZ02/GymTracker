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
                bool isSuccess = _userService.Register(user);
                if (isSuccess)
                    return Ok("User registered successfully");

                return BadRequest("Registration failed.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] CredentialsDto credentials)
        {
            try
            {
                string token = _userService.Login(credentials.Email, credentials.Password);
                return Ok(token);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }
    }
}
