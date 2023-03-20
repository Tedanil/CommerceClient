using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Product.GetRecentlyAddedProducts
{
    public class GetRecentlyAddedProductsQueryHandler : IRequestHandler<GetRecentlyAddedProductsQueryRequest, GetRecentlyAddedProductsQueryResponse>
    {
        readonly IProductService _productService;

        public GetRecentlyAddedProductsQueryHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetRecentlyAddedProductsQueryResponse> Handle(GetRecentlyAddedProductsQueryRequest request, CancellationToken cancellationToken)
        {
            var (datas, count) = _productService.GetRecentlyAddedProducts();

            return new()
            {
                RecentlyProducts = datas,
                RecentlyTotalProductCount = count

            };
        }
    }
}
