using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.AppUser.GetUserByToken
{
    public class GetUserByTokenQueryHandler : IRequestHandler<GetUserByTokenQueryRequest, GetUserByTokenQueryResponse>
    {
        readonly IUserService _userService;

        public GetUserByTokenQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<GetUserByTokenQueryResponse> Handle(GetUserByTokenQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _userService.GetUserAsync(request.RefreshToken);

            return new()
            {
                NameSurname = data.NameSurname,
                Username = data.Username,
                Email = data.Email,
                PhoneNumber = data.PhoneNumber,
                UserId = data.UserId
            };
           
        }
    }
}
