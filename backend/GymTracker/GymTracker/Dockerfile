FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.sln ./
COPY GymTracker/GymTracker.csproj GymTracker/
RUN dotnet restore GymTracker/GymTracker.csproj
COPY . .
WORKDIR /src/GymTracker
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "GymTracker.dll"]
