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
        private readonly string _secretKey = JwtHelper.GenerateRandomSecretKey();  

        public string GenerateJwtToken(int userId, string username, string email)
        {
            var claims = new[]
            {  
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Name, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "GymTracker",
                audience: "gymtracker-users",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),  
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

public class JwtHelper
{
    public static string GenerateRandomSecretKey()
    {
        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] secretKeyBytes = new byte[32]; 
            rng.GetBytes(secretKeyBytes);
            return Convert.ToBase64String(secretKeyBytes); 
        }
    }
}
