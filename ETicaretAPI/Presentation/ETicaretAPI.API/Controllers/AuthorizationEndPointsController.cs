using ETicaretAPI.Application.Features.Commands.AuthorizationEndpoint.AssignRoleEndpoint;
using ETicaretAPI.Application.Features.Queries.AuthorizationEndpoint.GetRolesToEndpoints;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationEndPointsController : ControllerBase
    {
        readonly IMediator _mediator;

        public AuthorizationEndPointsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetRolesToEndpoint(GetRolesToEndpointQueryRequest getRolesToEndpointQueryRequest)
        {
           GetRolesToEndpointQueryResponse response = await _mediator.Send(getRolesToEndpointQueryRequest);
            return Ok(response);    

        }

        [HttpPost]
        public async Task<IActionResult> AssignRoleEndpoint(AssignRoleEndpointCommandRequest assignRoleEndpointCommandRequest)
        {
            assignRoleEndpointCommandRequest.Type = typeof(Program);
            AssignRoleEndpointCommandResponse response =  await _mediator.Send(assignRoleEndpointCommandRequest);
            return Ok();
        }
    }
}
