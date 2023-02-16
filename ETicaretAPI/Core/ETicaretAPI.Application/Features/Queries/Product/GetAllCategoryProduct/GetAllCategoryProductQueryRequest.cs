using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Product.GetAllCategoryProduct
{
    public class GetAllCategoryProductQueryRequest : IRequest<GetAllCategoryProductQueryResponse>
    {
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
    }
}