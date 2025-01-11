using GymTracker.Models;
using GymTracker.Services;
using Microsoft.AspNetCore.Mvc;
using GymTracker.Extensions;
using GymTracker.Services.Interfaces;

namespace GymTracker.Controllers
{
    [ApiController]
    [Route("api/workout")]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] Workout workout)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }

            int userId = User.Id();

            if(userId != 0)
                workout.UserId = userId;
            else
                return Unauthorized();

            Workout success = _workoutService.Add(workout);
            return Ok(success);
        }

        [HttpGet("user/workouts")]
        public IActionResult GetAllForUser()
        {
            int userId = User.Id();

            if (userId == 0)
                return Unauthorized();

            var workouts = _workoutService.GetAllForUser(userId);
            return Ok(workouts);
        }
    }
}
