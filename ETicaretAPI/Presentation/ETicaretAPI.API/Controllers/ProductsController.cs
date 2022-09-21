
using ETicaretAPI.Application.Abstractions.Storage;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Application.RequestParameters;
using ETicaretAPI.Application.ViewModels.Products;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        readonly IFileReadRepository _fileReadRepository;
        readonly IFileWriteRepository _fileWriteRepository;
        readonly IProductImageFileReadRepository _productImageFileReadRepository;
        readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        readonly IInvoiceFileWriteRepository _invoiceFileWriteRepository;   
        readonly IInvoiceFileReadRepository _invoiceFileReadRepository;
        readonly IStorageService _storageService;
        readonly IConfiguration _configuration;

        public ProductsController(IProductWriteRepository productWriteRepository, IWebHostEnvironment webHostEnvironment, IProductReadRepository productReadRepository, IStorageService storageService, IFileReadRepository fileReadRepository, IFileWriteRepository fileWriteRepository, IProductImageFileReadRepository productImageFileReadRepository, IProductImageFileWriteRepository productImageFileWriteRepository, IInvoiceFileWriteRepository invoiceFileWriteRepository, IInvoiceFileReadRepository invoiceFileReadRepository, IConfiguration configuration)
        {
            _productWriteRepository = productWriteRepository;
            _webHostEnvironment = webHostEnvironment;
            _productReadRepository = productReadRepository; 
            _fileReadRepository = fileReadRepository;
            _fileWriteRepository = fileWriteRepository;
            _productImageFileReadRepository = productImageFileReadRepository;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _invoiceFileWriteRepository = invoiceFileWriteRepository;
            _invoiceFileReadRepository = invoiceFileReadRepository;
            _storageService = storageService;
            this._configuration = configuration;
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
        public async Task<IActionResult> Upload(string id)
        {

           List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("photo-images", Request.Form.Files);

            Product product = await _productReadRepository.GetByIdAsync(id);
           


            await _productImageFileWriteRepository.AddRangeAsync(result.Select(r => new ProductImageFile
            {
               FileName = r.fileName,
               Path = r.pathOrContainerName,
               Storage = _storageService.StorageName,
               Products = new List<Product>() { product }

            }).ToList());

           await _productImageFileWriteRepository.SaveAsync();



            return Ok();    
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetProductImages(string id)
        {
            Product? product = await _productReadRepository.Table.Include(p => p.ProductImageFiles)
                .FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));
            await Task.Delay(1000);

            return Ok(product.ProductImageFiles.Select(p => new
            {
                Path = $"{_configuration["BaseStorageUrl"]}/{p.Path}",
                p.FileName


            }));
                


        }


    }
}
 