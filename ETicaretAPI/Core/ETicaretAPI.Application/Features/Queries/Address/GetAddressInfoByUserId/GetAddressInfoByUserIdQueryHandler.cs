using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.Repositories;
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
        readonly IAddressReadRepository _addressReadRepository;

        public GetAddressInfoByUserIdQueryHandler(IAddressService addressService, IAddressReadRepository addressReadRepository)
        {
            _addressService = addressService;
            _addressReadRepository = addressReadRepository;
        }

        public async Task<GetAddressInfoByUserIdQueryResponse> Handle(GetAddressInfoByUserIdQueryRequest request, CancellationToken cancellationToken)
        {
            var infos = _addressReadRepository.GetAll(false).Where(a => a.UserId == request.UserId)
         .Select(x => new
         {
             Id = x.Id.ToString(),
             x.Name,
             x.Surname,
             x.Title,
             x.PhoneNumber,
             x.Neighborhood,
             x.Description,
             x.City,
             x.District

         }).ToList();

            return new()
            {
                Infos = infos
            };
        }
    }
}
