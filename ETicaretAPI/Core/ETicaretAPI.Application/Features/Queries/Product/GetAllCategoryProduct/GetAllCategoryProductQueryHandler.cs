using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Product.GetAllCategoryProduct
{
    public class GetAllCategoryProductQueryHandler : IRequestHandler<GetAllCategoryProductQueryRequest, GetAllCategoryProductQueryResponse>
    {
        readonly IProductService _productService;

        public GetAllCategoryProductQueryHandler(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<GetAllCategoryProductQueryResponse> Handle(GetAllCategoryProductQueryRequest request, CancellationToken cancellationToken)
        {
            var (datas, count) = _productService.GetAllProducts(request.Page, request.Size);


            return new()
            {
                Products = datas,
                TotalProductCount = count

            };
        }
    }
}
