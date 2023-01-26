using ETicaretAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Address.GetSingleAddressById
{
    public class GetSingleAddressByIdQueryHandler : IRequestHandler<GetSingleAddressByIdQueryRequest, GetSingleAddressByIdQueryResponse>
    {
        readonly IAddressReadRepository _addressReadRepository;

        public GetSingleAddressByIdQueryHandler(IAddressReadRepository addressReadRepository)
        {
            _addressReadRepository = addressReadRepository;
        }

        public async Task<GetSingleAddressByIdQueryResponse> Handle(GetSingleAddressByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var infos = _addressReadRepository.GetAll(false).Where(a => a.Id == Guid.Parse(request.Id))
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
                SingleAddressInfo = infos
            };
        }
    }
}
