using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Address.GetAddressInfoByUserId
{
    public class GetAddressInfoByUserIdQueryRequest : IRequest<GetAddressInfoByUserIdQueryResponse>
    {
        public string UserId { get; set; }
    }
}