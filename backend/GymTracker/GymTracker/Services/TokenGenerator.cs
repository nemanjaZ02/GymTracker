using DotNetEnv;
using GymTracker.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace GymTracker.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly string _secretKey = Env.GetString("Jwt_SecretKey");
        private readonly string _issuer = Env.GetString("Jwt_Issuer");
        private readonly string _audience = Env.GetString("Jwt_Audience"); 

        public string GenerateJwtToken(int userId, string username, string email)
        {
            var claims = new[]
            {  
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Name, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),  
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
