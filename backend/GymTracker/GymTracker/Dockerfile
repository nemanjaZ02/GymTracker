# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.sln ./
COPY GymTracker/GymTracker.csproj GymTracker/
RUN dotnet restore GymTracker/GymTracker.csproj
COPY . .
WORKDIR /src/GymTracker
RUN dotnet publish -c Release -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 80
ENTRYPOINT ["dotnet", "GymTracker.dll"]
