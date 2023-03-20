using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Product.GetRecentlyAddedProducts
{
    public class GetRecentlyAddedProductsQueryRequest : IRequest<GetRecentlyAddedProductsQueryResponse>
    {
    }
}