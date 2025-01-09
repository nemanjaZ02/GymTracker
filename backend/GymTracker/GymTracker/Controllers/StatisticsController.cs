using GymTracker.Extensions;
using GymTracker.Models;
using GymTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymTracker.Controllers
{
    [ApiController]
    [Route("api/statistics")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("progress")]
        public IActionResult GetProgress([FromQuery] int month, [FromQuery] int year)
        {
            int userId = User.Id();

            if (userId == 0)
                return Unauthorized();

            var progress = _statisticsService.GetProgress(userId, month, year);
            return Ok(progress);
        }
    }
}
