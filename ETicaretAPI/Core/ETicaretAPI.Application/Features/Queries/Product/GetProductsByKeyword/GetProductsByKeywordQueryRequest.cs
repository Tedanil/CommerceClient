using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Product.GetProductsByKeyword
{
    public class GetProductsByKeywordQueryRequest : IRequest<GetProductsByKeywordQueryResponse>
    {
        public string Keyword { get; set; }
    }
}