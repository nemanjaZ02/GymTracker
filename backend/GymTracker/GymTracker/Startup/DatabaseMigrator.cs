using Microsoft.EntityFrameworkCore;

namespace GymTracker.Startup
{
    public class DatabaseMigrator
    {
        public static void ApplyMigrations(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var services = scope.ServiceProvider;
            var configuration = services.GetRequiredService<IConfiguration>();
            var logger = services.GetRequiredService<ILogger<DatabaseMigrator>>();

            bool applyMigrations = configuration.GetValue<bool>("APPLY_MIGRATIONS");

            if (applyMigrations)
            {
                logger.LogInformation("Applying database migrations...");
                try
                {
                    var context = services.GetRequiredService<AppDbContext>();
                    context.Database.Migrate();
                    logger.LogInformation("Database migrations applied successfully.");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while applying migrations.");
                }
            }
            else
            {
                logger.LogInformation("Skipping database migrations.");
            }
        }
    }
}