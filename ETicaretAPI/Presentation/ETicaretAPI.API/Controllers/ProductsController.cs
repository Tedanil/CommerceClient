﻿
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.RequestParameters;
using ETicaretAPI.Application.Services;
using ETicaretAPI.Application.ViewModels.Products;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly private IProductWriteRepository _productWriteRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        readonly private IProductReadRepository _productReadRepository;
        readonly IFileService _fileService;
        readonly IFileReadRepository _fileReadRepository;
        readonly IFileWriteRepository _fileWriteRepository;
        readonly IProductImageFileReadRepository _productImageFileReadRepository;
        readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        readonly IInvoiceFileWriteRepository _invoiceFileWriteRepository;   
        readonly IInvoiceFileReadRepository _invoiceFileReadRepository;

        public ProductsController(IProductWriteRepository productWriteRepository, IWebHostEnvironment webHostEnvironment, IProductReadRepository productReadRepository, IFileService fileService, IFileReadRepository fileReadRepository, IFileWriteRepository fileWriteRepository, IProductImageFileReadRepository productImageFileReadRepository, IProductImageFileWriteRepository productImageFileWriteRepository, IInvoiceFileWriteRepository invoiceFileWriteRepository, IInvoiceFileReadRepository invoiceFileReadRepository)
        {
            _productWriteRepository = productWriteRepository;
            _webHostEnvironment = webHostEnvironment;
            _productReadRepository = productReadRepository;
            _fileService = fileService;
            _fileReadRepository = fileReadRepository;
            _fileWriteRepository = fileWriteRepository;
            _productImageFileReadRepository = productImageFileReadRepository;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _invoiceFileWriteRepository = invoiceFileWriteRepository;
            _invoiceFileReadRepository = invoiceFileReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]Pagination pagination)
        {

           var totalCount = _productReadRepository.GetAll(false).Count();
            var products = _productReadRepository.GetAll(false).Skip(pagination.Page * pagination.Size).Take(pagination.Size).Select(p => new
            {

                p.Id,
                p.Name,
                p.Stock,
                p.Price,
                p.CreatedDate,
                p.UpdatedDate

            }).ToList();


            return Ok(new
            {
                totalCount,
                products
            });

            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {




            return Ok(await _productReadRepository.GetByIdAsync(id, false));



        }


        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Product model)
        {

            


            await _productWriteRepository.AddAsync(new()
            {
                Name = model.Name,
                Price = (long)model.Price,
                Stock = model.Stock



            });
            await _productWriteRepository.SaveAsync();
            return StatusCode((int)HttpStatusCode.Created);

        }
        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Product model)
        {
            Product product = await _productReadRepository.GetByIdAsync(model.Id);
            product.Stock = model.Stock;
            product.Price = (long)model.Price;
            product.Name = model.Name;
            await _productWriteRepository.SaveAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _productWriteRepository.RemoveAsync(id);
            await _productWriteRepository.SaveAsync();
            return Ok();



        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Upload()
        {
            var datas = await _fileService.UploadAsync("resource/product-images", Request.Form.Files);
            //await _productImageFileWriteRepository.AddRangeAsync(datas.Select(d => new ProductImageFile()
            //{
            //    FileName = d.fileName,
            //    Path = d.path

            //}).ToList());
            //await _productImageFileWriteRepository.SaveAsync();
            await _invoiceFileWriteRepository.AddRangeAsync(datas.Select(d => new InvoiceFile()
            {
                FileName = d.fileName,
                Path = d.path,
                Price = new Random().Next()
            }).ToList());

            await _invoiceFileWriteRepository.SaveAsync();

            return Ok();    
        }

    }
}
 