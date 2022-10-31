using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Product.GetAllCategoryProduct
{
    public class GetAllCategoryProductQueryRequest : IRequest<GetAllCategoryProductQueryResponse>
    {
        public string CategoryName { get; set; }
    }
}