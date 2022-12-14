using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.User;
using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETicaretAPI.Application.Helpers;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ETicaretAPI.Persistence.Contexts;

namespace ETicaretAPI.Persistence.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;
        private ETicaretAPIDbContext _eTicaretAPIDbContext;


        public UserService(UserManager<AppUser> userManager, ETicaretAPIDbContext eTicaretAPIDbContext)
        {
            _userManager = userManager;
            _eTicaretAPIDbContext = eTicaretAPIDbContext;
        }

        public async Task<CreateUserResponse> CreateAsync(CreateUser model)
        {
            var x = _eTicaretAPIDbContext.Users.ToList();

            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = model.Username,
                NameSurname = model.NameSurname,
                Email = model.Email
            }, model.Password);

            CreateUserResponse response = new() { Succeeded = result.Succeeded };

            if (result.Succeeded)
                response.Message = "Kullanıcı başarıyla oluşturulmuştur!";
            else
                foreach (var error in result.Errors)
                    response.Message += $"{error.Code} - {error.Description}<br>";

            return response;
        }

        public async Task UpdateRefreshTokenAsync(string refreshToken, AppUser user, DateTime accessTokenDate, int addOnAccessTokenDate)
        {
           
          
            if (user != null)
            {
                user.RefreshToken = refreshToken;
                user.RefreshTokenEndDate = accessTokenDate.AddSeconds(addOnAccessTokenDate);
                await _userManager.UpdateAsync(user);

            }
            else
            throw new NotFoundUserException();
            
        }

        public async Task UpdatePasswordAsync(string userId, string resetToken, string newPassword)
        {
            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                resetToken = resetToken.UrlDecode();
                IdentityResult result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
                if (result.Succeeded)
                    await _userManager.UpdateSecurityStampAsync(user);
                else
                    throw new PasswordChangeFailedException();
            }
        }

        public async Task<UserResponse> GetUserAsync(string refreshToken)
        {
            AppUser? user =  _userManager.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);
            if(user != null) 
            { 
            return new()
            {
                NameSurname = user.NameSurname,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber

            };
            }
            else
                throw new NotFoundUserException();
        }
    }
}
