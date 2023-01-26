using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Commands.Address.UpdateAddress
{
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommandRequest, UpdateAddressCommandResponse>
    {
        readonly IAddressService _addressService;

        public UpdateAddressCommandHandler(IAddressService addressService)
        {
            _addressService = addressService;
        }

        public async Task<UpdateAddressCommandResponse> Handle(UpdateAddressCommandRequest request, CancellationToken cancellationToken)
        {
            await _addressService.UpdateAddressAsync(new()
            {
                Id = request.Id,
                UserId = request.UserId,
                Name = request.Name,
                Surname = request.Surname,
                Phone = request.Phone,
                Neighborhood = request.Neighborhood,
                Description = request.Description,
                Title = request.Title,
                SelectCity = request.SelectCity,
                SelectDistrict = request.SelectDistrict
            });

            return new();
        }
    }
}
