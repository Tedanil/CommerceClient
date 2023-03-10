namespace ETicaretAPI.Application.Features.Queries.Product.GetTopSellingProducts
{
    public class GetTopSellingProductsQueryResponse
    {
        public int TotalProductCount { get; set; }
        public object Products { get; set; }
    }
}