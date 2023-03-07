using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.Product;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Services
{
    public class ProductService : IProductService
    {
        readonly IProductReadRepository _productReadRepository;
        readonly IProductWriteRepository _productWriteRepository;
        readonly IQRCodeService _qRCodeService;

        public ProductService(IProductReadRepository productReadRepository, IQRCodeService qRCodeService, IProductWriteRepository productWriteRepository)
        {
            _productReadRepository = productReadRepository;
            _qRCodeService = qRCodeService;
            _productWriteRepository = productWriteRepository;
        }

        public (object, int) GetAllProducts(int page, int size)
        {
            var query = _productReadRepository.GetAll(false);

            IQueryable<Product> productsQuery = null;

            if (page != -1 && size != -1)
                productsQuery = query.Skip(page * size).Take(size);
            else
                productsQuery = query;


            return (productsQuery.Include(p => p.ProductImageFiles)
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
            }),
            query.Count());
        }

        public (object, int) GetProductsByKeyword(string keyword)
        {
            var query = _productReadRepository.GetAll(false);
            IQueryable<Product> productsQuery = null;

            if (!string.IsNullOrEmpty(keyword))
            {
                productsQuery = query.Where(p => p.Name.Contains(keyword) || p.Description.Contains(keyword.Substring(0, Math.Min(keyword.Length, 3))));
            }

           

            return (productsQuery.Include(p => p.ProductImageFiles)
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
                }),
                productsQuery.Count());
        }

        public object GetProductById(string id)
        {
            return _productReadRepository.GetAll(false)
                .Include(p => p.ProductImageFiles)
                .Where(p => p.Id == Guid.Parse(id))
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
                })
                .FirstOrDefault();
        }

        public async Task CreateProductAsync(CreateProduct createProduct)
        {
            await _productWriteRepository.AddAsync(new()
            {
                Name = createProduct.Name,
                Description = createProduct.Description,
                CategoryName = createProduct.CategoryName,
                Price = (long)createProduct.Price,
                Stock = createProduct.Stock



            });
            await _productWriteRepository.SaveAsync();
        }

        public async Task RemoveProductAsync(string id)
        {
            await _productWriteRepository.RemoveAsync(id);
            await _productWriteRepository.SaveAsync();
        }


        public async Task<byte[]> QrCodeToProductAsync(string productId)
        {
           Product product = await _productReadRepository.GetByIdAsync(productId);
            if (product == null)
                throw new Exception("Product not found");

            var plainObject = new
            {
                product.Id,
                product.Name,
                product.Price,
                product.Stock,
                product.CreatedDate
                
            };
            string plainText = JsonSerializer.Serialize(plainObject);
            
            return _qRCodeService.GenerateQRCode(plainText);
        }

        
        public async Task StockUpdateToProductAsync(string productId, int stock)
        {
            Product product = await _productReadRepository.GetByIdAsync(productId);
            if (product == null)
                throw new Exception("Product not found");

            product.Stock = stock;
            await _productWriteRepository.SaveAsync();
        }

        
    }
}
