﻿using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
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
