﻿using ETicaretAPI.Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Abstractions.Services
{
    public interface IProductService
    {
        public Task CreateProductAsync(CreateProduct createProduct);
        public Task RemoveProductAsync(string id);
        Task<byte[]> QrCodeToProductAsync(string productId);
        Task StockUpdateToProductAsync(string productId, int stock);
        
    }
}
