using ETicaretAPI.Application.DTOs.Address;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Abstractions.Services
{
    public interface IAddressService
    {
       public Task CreateAddressAsync(CreateAddress createAddress);
       public Task<ListCity> GetAllCityAsync();
       public Task<ListDistrict> GetDistrictsByCityIdAsync(int cityId);
       public Task<AddressInfo> GetAddressInfoByUserIdAsync(string userId);
       public Task RemoveAddressAsync(string id);
    }
}
