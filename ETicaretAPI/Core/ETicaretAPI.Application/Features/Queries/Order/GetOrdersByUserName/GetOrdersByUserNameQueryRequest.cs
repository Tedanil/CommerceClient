using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Order.GetOrdersByUserName
{
    public class GetOrdersByUserNameQueryRequest :IRequest<GetOrdersByUserNameQueryResponse>
    {
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
        public string UserName { get; set; }
    }
}