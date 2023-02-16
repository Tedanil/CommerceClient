using ETicaretAPI.Application.Abstractions.Hubs;
using ETicaretAPI.Application.Abstractions.Services;
using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Product.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, CreateProductCommandResponse>
    {
        
        readonly IProductHubService _productHubService;
        readonly IProductService _productService;

        public CreateProductCommandHandler(IProductHubService productHubService, IProductService productService)
        {
            _productHubService = productHubService;
            _productService = productService;
        }

        public async Task<CreateProductCommandResponse> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {
            await _productService.CreateProductAsync(new()
            {
                Name = request.Name,
                Description = request.Description,
                Stock = request.Stock,
                Price = request.Price,
                CategoryName = request.CategoryName,
            });
            await _productHubService.ProductAddedMessageAsync($"{request.Name} isminde ürün eklenmiştir!");
            return new();
        }
    }
}
