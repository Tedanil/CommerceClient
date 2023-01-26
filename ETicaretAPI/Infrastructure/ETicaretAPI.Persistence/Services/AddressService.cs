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
        readonly IAddressReadRepository _addressReadRepository;
        private ETicaretAPIDbContext _eTicaretAPIDbContext;
        readonly ICityReadRepository _cityReadRepository;
        readonly IDistrictReadRepository _districtReadRepository;

        public AddressService(IAddressWriteRepository addressWriteRepository, ICityReadRepository cityReadRepository, ETicaretAPIDbContext eTicaretAPIDbContext, IDistrictReadRepository districtReadRepository, IAddressReadRepository addressReadRepository)
        {
            _addressWriteRepository = addressWriteRepository;
            _cityReadRepository = cityReadRepository;
            _eTicaretAPIDbContext = eTicaretAPIDbContext;
            _districtReadRepository = districtReadRepository;
            _addressReadRepository = addressReadRepository;
        }

        public async Task CreateAddressAsync(CreateAddress createAddress)
        {
            var cityName = _cityReadRepository.Table.FirstOrDefault(c => c.CityId == createAddress.SelectCity);
            var districtName = _districtReadRepository.Table.FirstOrDefault(d => d.DistrictId == createAddress.SelectDistrict);

            await _addressWriteRepository.AddAsync(new()
            {
                AddressId = Guid.NewGuid().ToString(),
                UserId = createAddress.UserId,
                Name = createAddress.Name,
                Surname = createAddress.Surname,
                Title = createAddress.Title,
                PhoneNumber = createAddress.Phone,
                City = cityName.CityName,
                District = districtName.DistrictName,
                Neighborhood = createAddress.Neighborhood,
                Description = createAddress.Description               
                
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

        public async Task<ListDistrict> GetDistrictsByCityIdAsync(int cityId)
        {
            var districts = _districtReadRepository.GetAll(false).Where(d => d.CityId == cityId)
                .Select(x => new
                {
                    x.DistrictId,
                    x.DistrictName
                }).ToList();

            return new()
            {
                Districts = districts
            };
        }

        public async Task<AddressInfo> GetAddressInfoByUserIdAsync(string userId)
        {
            var infos = _addressReadRepository.GetAll(false).Where(a => a.UserId == userId)
                .Select(x => new
                {
               Id = x.Id.ToString(),
                    x.Name,
                    x.Surname,
                    x.Title,
                    x.PhoneNumber,
                    x.Neighborhood,
                    x.Description,
                    x.City,
                    x.District

                }).ToList();

            return new()
            {
                Infos = infos
            };
        }

        public async Task RemoveAddressAsync(string id)
        {
           Address address = await _addressReadRepository.GetByIdAsync(id);
            if (address != null)
            {
                _addressWriteRepository.Remove(address);
                await _addressWriteRepository.SaveAsync();
            }


        }

        public async Task UpdateAddressAsync(UpdateAddress updateAddress)
        {
            City? cityName = _cityReadRepository.Table.FirstOrDefault(c => c.CityId == updateAddress.SelectCity);
            District? districtName = _districtReadRepository.Table.FirstOrDefault(d => d.DistrictId == updateAddress.SelectDistrict);

            Address? address =  await _addressReadRepository.GetByIdAsync(updateAddress.Id);
            if(address != null)
            {
                address.Name = updateAddress.Name;
                address.Surname = updateAddress.Surname;
                address.PhoneNumber = updateAddress.Phone;
                address.Neighborhood = updateAddress.Neighborhood;
                address.Description = updateAddress.Description;
                address.Title = updateAddress.Title;
                address.City = cityName.CityName;
                address.District = districtName.DistrictName;

                await _addressWriteRepository.SaveAsync();
            }
        }
    }
}
