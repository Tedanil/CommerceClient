using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.Consts;
using ETicaretAPI.Application.CustomAttributes;
using ETicaretAPI.Application.DTOs.Address;
using ETicaretAPI.Application.Enums;
using ETicaretAPI.Application.Features.Commands.Address.ChangeShowcaseAddress;
using ETicaretAPI.Application.Features.Commands.Address.CreateAddress;
using ETicaretAPI.Application.Features.Commands.Address.RemoveAddress;
using ETicaretAPI.Application.Features.Commands.Address.UpdateAddress;
using ETicaretAPI.Application.Features.Queries.Address.GetAddressInfoByUserId;
using ETicaretAPI.Application.Features.Queries.Address.GetSingleAddressById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Admin")]
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
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Writing, Definition = "Create Address")]
        public async Task<IActionResult> CreateAddress(CreateAddressCommandRequest createAddressCommandRequest)
        {
            CreateAddressCommandResponse response = await _mediator.Send(createAddressCommandRequest);
            return Ok(response);
        }
        [HttpPut("[action]")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Updating, Definition = "Update Address")]
        public async Task<IActionResult> UpdateAddress(UpdateAddressCommandRequest updateAddressCommandRequest)
        {
            UpdateAddressCommandResponse response = await _mediator.Send(updateAddressCommandRequest);
            return Ok(response);
        }

        [HttpGet]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Reading, Definition = "Get Cities")]
        public async Task<IActionResult> Get()
        {

            ListCity cities = await _addressService.GetAllCityAsync();
            return Ok(cities);
        }

        [HttpGet("[action]/{CityId}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Reading, Definition = "Get Districts")]
        public async Task<IActionResult> GetDistricts([FromRoute] int cityId)
        {

            ListDistrict districts = await _addressService.GetDistrictsByCityIdAsync(cityId);
            return Ok(districts);
        }

        [HttpGet("[action]/{UserId}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Reading, Definition = "Get Address Infos By UserId")]
        public async Task<IActionResult> GetAddressInfo([FromRoute] GetAddressInfoByUserIdQueryRequest getAddressInfoByUserIdQueryRequest)
        {

            GetAddressInfoByUserIdQueryResponse response = await _mediator.Send(getAddressInfoByUserIdQueryRequest);
            return Ok(response);
        }

        [HttpGet("[action]/{Id}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Reading, Definition = "Get Single Address Info")]
        public async Task<IActionResult> GetSingleAddress([FromRoute] GetSingleAddressByIdQueryRequest getSingleAddressByIdQueryRequest)
        {

            GetSingleAddressByIdQueryResponse response = await _mediator.Send(getSingleAddressByIdQueryRequest);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Deleting, Definition = "Delete Address")]
        public async Task<IActionResult> Delete([FromRoute] RemoveAddressCommandRequest removeAddressCommandRequest)
        {
            RemoveAddressCommandResponse response = await _mediator.Send(removeAddressCommandRequest);
            return Ok();
        }

        [HttpGet("[action]")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Addresses,
            ActionType = ActionType.Updating, Definition = "Change Showcase Address")]
        public async Task<IActionResult> ChangeShowcaseAddress([FromQuery] ChangeShowcaseAddressCommandRequest changeShowcaseAddressCommandRequest)
        {
            ChangeShowcaseAddressCommandResponse response = await _mediator.Send(changeShowcaseAddressCommandRequest);
            return Ok(response);
        }
    }
}
