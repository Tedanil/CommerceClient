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
    }
}
