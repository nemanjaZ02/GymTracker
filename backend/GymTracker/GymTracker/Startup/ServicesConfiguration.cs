using GymTracker.Repositories;
using GymTracker.Repositories.Interfaces;
using GymTracker.Services;
using GymTracker.Services.Interfaces;

namespace GymTracker
{
    public static class ServicesConfiguration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
        }
    }
}
