using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.Address;
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
        private IAddressService _addressService;

        public AddressController(IMediator mediator, IAddressService addressService)
        {
            _mediator = mediator;
            _addressService = addressService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAddress(CreateAddressCommandRequest createAddressCommandRequest)
        {
            CreateAddressCommandResponse response = await _mediator.Send(createAddressCommandRequest);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            ListCity cities = await _addressService.GetAllCityAsync();
            return Ok(cities);
        }
    }
}
