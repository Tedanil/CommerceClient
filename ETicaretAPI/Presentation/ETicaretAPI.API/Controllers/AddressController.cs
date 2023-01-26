using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.Address;
using ETicaretAPI.Application.Features.Commands.Address.CreateAddress;
using ETicaretAPI.Application.Features.Commands.Address.RemoveAddress;
using ETicaretAPI.Application.Features.Queries.Address.GetAddressInfoByUserId;
using ETicaretAPI.Application.Features.Queries.Address.GetSingleAddressById;
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

        [HttpGet("[action]/{CityId}")]
        public async Task<IActionResult> GetDistricts([FromRoute] int cityId)
        {

            ListDistrict districts = await _addressService.GetDistrictsByCityIdAsync(cityId);
            return Ok(districts);
        }

        [HttpGet("[action]/{UserId}")]
        public async Task<IActionResult> GetAddressInfo([FromRoute] GetAddressInfoByUserIdQueryRequest getAddressInfoByUserIdQueryRequest)
        {

            GetAddressInfoByUserIdQueryResponse response = await _mediator.Send(getAddressInfoByUserIdQueryRequest);
            return Ok(response);
        }

        [HttpGet("[action]/{Id}")]
        public async Task<IActionResult> GetSingleAddress([FromRoute] GetSingleAddressByIdQueryRequest getSingleAddressByIdQueryRequest)
        {

            GetSingleAddressByIdQueryResponse response = await _mediator.Send(getSingleAddressByIdQueryRequest);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] RemoveAddressCommandRequest removeAddressCommandRequest)
        {
            RemoveAddressCommandResponse response = await _mediator.Send(removeAddressCommandRequest);
            return Ok();
        }
    }
}
