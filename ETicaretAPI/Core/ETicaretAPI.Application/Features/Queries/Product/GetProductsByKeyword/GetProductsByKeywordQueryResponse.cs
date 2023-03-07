namespace ETicaretAPI.Application.Features.Queries.Product.GetProductsByKeyword
{
    public class GetProductsByKeywordQueryResponse
    {
        public int TotalProductCount { get; set; }
        public object Products { get; set; }
    }
}