using GymTracker;
using GymTracker.API.Startup;
using GymTracker.Startup;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(Env.GetString("DefaultConnection")));

builder.Services.ConfigureAuth(builder.Configuration);
builder.Services.ConfigureSwagger(builder.Configuration);
builder.Services.AddApplicationServices();

builder.Services.AddControllers();

const string corsPolicy = "_corsPolicy";
builder.Services.ConfigureCors(corsPolicy);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(corsPolicy);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
 
app.MapControllers();

app.Run();
