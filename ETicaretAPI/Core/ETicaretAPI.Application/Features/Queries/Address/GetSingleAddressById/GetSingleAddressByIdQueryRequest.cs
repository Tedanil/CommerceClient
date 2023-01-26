using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Address.GetSingleAddressById
{
    public class GetSingleAddressByIdQueryRequest : IRequest<GetSingleAddressByIdQueryResponse>
    {
        public string Id { get; set; }
    }
}