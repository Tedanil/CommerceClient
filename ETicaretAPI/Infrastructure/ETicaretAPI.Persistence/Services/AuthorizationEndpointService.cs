using ETicaretAPI.Application.Abstractions.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Services
{
    public class AuthorizationEndpointService : IAuthorizationEndpointService
    {
        public Task AssignRoleEndpointAsync(string[] roles, string code)
        {
            throw new NotImplementedException();
        }
    }
}
