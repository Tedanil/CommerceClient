using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.DTOs.Address;
using ETicaretAPI.Application.Repositories;
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

        public AddressService(IAddressWriteRepository addressWriteRepository)
        {
            _addressWriteRepository = addressWriteRepository;
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
    }
}
