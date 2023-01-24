using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Commands.Address.CreateAddress
{
    public class CreateAddressCommandHandler : IRequestHandler<CreateAddressCommandRequest, CreateAddressCommandResponse>
    {
        readonly IAddressService _addressService;

        public CreateAddressCommandHandler(IAddressService addressService)
        {
            _addressService = addressService;
        }

        public async Task<CreateAddressCommandResponse> Handle(CreateAddressCommandRequest request, CancellationToken cancellationToken)
        {
            await _addressService.CreateAddressAsync(new()
            {
                UserId = request.UserId,
                City = request.City,
                District = request.District
            });

            return new();
        }
    }
}
