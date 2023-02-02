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
        readonly IProductReadRepository _productReadRepository;
        readonly ILogger<GetAllCategoryProductQueryHandler> _logger;

        public GetAllCategoryProductQueryHandler(IProductReadRepository productReadRepository, ILogger<GetAllCategoryProductQueryHandler> logger)
        {
            _productReadRepository = productReadRepository;
            _logger = logger;
        }
        public async Task<GetAllCategoryProductQueryResponse> Handle(GetAllCategoryProductQueryRequest request, CancellationToken cancellationToken)
        {
            var totalProductCount = _productReadRepository.GetAll(false).Count();
            var products = _productReadRepository.GetAll(false)
                .Include(p => p.ProductImageFiles)
                .Select(p => new
                {

                    p.Id,
                    p.Name,
                    p.CategoryName,
                    p.Description,
                    p.Stock,
                    p.Price,
                    p.CreatedDate,
                    p.UpdatedDate,
                    p.ProductImageFiles
                }).ToList();

            return new()
            {
                Products = products,
                TotalProductCount = totalProductCount

            };
        }
    }
}
