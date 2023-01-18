namespace ETicaretAPI.Application.Features.Queries.Order.GetOrdersByUserName
{
    public class GetOrdersByUserNameQueryResponse
    {
        public int TotalOrderCount { get; set; }
        public object Orders { get; set; }
    }
}