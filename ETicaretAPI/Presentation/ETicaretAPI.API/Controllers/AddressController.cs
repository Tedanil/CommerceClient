using ETicaretAPI.Application.Features.Commands.Address.CreateAddress;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        readonly IMediator _mediator;

        public AddressController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAddress(CreateAddressCommandRequest createAddressCommandRequest)
        {
            CreateAddressCommandResponse response = await _mediator.Send(createAddressCommandRequest);
            return Ok(response);
        }
    }
}
