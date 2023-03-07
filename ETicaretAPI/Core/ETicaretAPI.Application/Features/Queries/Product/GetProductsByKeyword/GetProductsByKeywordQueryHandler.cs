using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Product.GetProductsByKeyword
{
    public class GetProductsByKeywordQueryHandler : IRequestHandler<GetProductsByKeywordQueryRequest, GetProductsByKeywordQueryResponse>
    {
        readonly IProductService _productService;

        public GetProductsByKeywordQueryHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetProductsByKeywordQueryResponse> Handle(GetProductsByKeywordQueryRequest request, CancellationToken cancellationToken)
        {
            var (datas, count) = _productService.GetProductsByKeyword(request.Keyword);


            return new()
            {
                Products = datas,
                TotalProductCount = count

            };
        }
    }
}
