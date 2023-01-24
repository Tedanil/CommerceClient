using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.Address;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Services
{
    public class AddressService : IAddressService
    {
        readonly IAddressWriteRepository _addressWriteRepository;
        private ETicaretAPIDbContext _eTicaretAPIDbContext;
        readonly ICityReadRepository _cityReadRepository;

        public AddressService(IAddressWriteRepository addressWriteRepository, ICityReadRepository cityReadRepository, ETicaretAPIDbContext eTicaretAPIDbContext)
        {
            _addressWriteRepository = addressWriteRepository;
            _cityReadRepository = cityReadRepository;
            _eTicaretAPIDbContext = eTicaretAPIDbContext;
        }

        public async Task CreateAddressAsync(CreateAddress createAddress)
        {
            await _addressWriteRepository.AddAsync(new()
            {
                UserId = createAddress.UserId,
                City = createAddress.City,
                District = createAddress.District,
                AddressId = Guid.NewGuid().ToString(),
                
            });

            await _addressWriteRepository.SaveAsync();
            
        }

        public async Task<ListCity> GetAllCityAsync()
        {
            var cities = _cityReadRepository.GetAll(false)
                .Select(x => new
                {
                    x.CityId,
                    x.CityName
                }).ToList();


            return new()
            {
                Cities = cities
            };
            
           
           
          
          
            
        }
    }
}
