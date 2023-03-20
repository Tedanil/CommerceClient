namespace ETicaretAPI.Application.Features.Queries.Product.GetRecentlyAddedProducts
{
    public class GetRecentlyAddedProductsQueryResponse
    {
        public int RecentlyTotalProductCount { get; set; }
        public object RecentlyProducts { get; set; }
    }
}