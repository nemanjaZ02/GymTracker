# GymTracker
- Fitness tracking application that helps users log their workouts, monitor progress, and stay motivated. Users can track exercise types, duration, calories burned, workout intensity, and fatigue, providing detailed insights to help them achieve their fitness goals.

# Setting Up the Database
- To ensure the database is correctly initialized and updated, you need to run Entity Framework Core migrations. Follow the steps below to create and update the database.
1. Run the database and App `docker-compose up -d --build`
2. Navigate to the Project Directory `cd .\backend\GymTracker\GymTracker`
3. Add new migration `dotnet ef migrations add InitialCreate`
4. Update the database `dotnet ef database update --connection "Host=localhost;Port=5433;Database=gym_tracker;Username=postgres;Password=postgres"`
