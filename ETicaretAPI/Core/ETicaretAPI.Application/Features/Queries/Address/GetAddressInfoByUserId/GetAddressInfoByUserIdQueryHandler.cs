using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Address.GetAddressInfoByUserId
{
    public class GetAddressInfoByUserIdQueryHandler : IRequestHandler<GetAddressInfoByUserIdQueryRequest, GetAddressInfoByUserIdQueryResponse>
    {
        readonly IAddressService _addressService;

        public GetAddressInfoByUserIdQueryHandler(IAddressService addressService)
        {
            _addressService = addressService;
        }

        public async Task<GetAddressInfoByUserIdQueryResponse> Handle(GetAddressInfoByUserIdQueryRequest request, CancellationToken cancellationToken)
        {
            var infos = await _addressService.GetAddressInfoByUserIdAsync(request.UserId);

            return new()
            {
                Infos = infos
            };
        }
    }
}
