using System.Security.Claims;

namespace GymTracker.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int Id(this ClaimsPrincipal user)
        {
            var userId = user.FindFirst("id")?.Value;
            return userId != null ? int.Parse(userId) : 0; 
        }
    }
}
