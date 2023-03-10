using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Product.GetTopSellingProducts
{
    public class GetTopSellingProductsQueryHandler : IRequestHandler<GetTopSellingProductsQueryRequest, GetTopSellingProductsQueryResponse>
    {
        readonly IProductService _productService;

        public GetTopSellingProductsQueryHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetTopSellingProductsQueryResponse> Handle(GetTopSellingProductsQueryRequest request, CancellationToken cancellationToken)
        {
            var (datas, count) = _productService.GetTopSellingProducts();


            return new()
            {
                Products = datas,
                TotalProductCount = count

            };
        }
    }
}
