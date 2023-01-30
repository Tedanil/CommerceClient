using ETicaretAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Commands.Address.ChangeShowcaseAddress
{
    public class ChangeShowcaseAddressCommandHandler : IRequestHandler<ChangeShowcaseAddressCommandRequest, ChangeShowcaseAddressCommandResponse>
    {
        readonly IAddressWriteRepository _adressWriteRepository;

        public ChangeShowcaseAddressCommandHandler(IAddressWriteRepository adressWriteRepository)
        {
            _adressWriteRepository = adressWriteRepository;
        }

        public async Task<ChangeShowcaseAddressCommandResponse> Handle(ChangeShowcaseAddressCommandRequest request, CancellationToken cancellationToken)
        {
            var data = _adressWriteRepository.Table.FirstOrDefault(a => a.UserId == request.UserId && a.Showcase);
            if (data != null)
                data.Showcase = false;
            var selectedAddress = _adressWriteRepository.Table.FirstOrDefault(a => a.Id == Guid.Parse(request.Id));
            if (selectedAddress != null)
                selectedAddress.Showcase = true;

            await _adressWriteRepository.SaveAsync();

            return new();
        }
    }
}
