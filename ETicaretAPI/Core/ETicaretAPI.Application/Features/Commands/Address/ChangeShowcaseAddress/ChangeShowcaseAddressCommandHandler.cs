using ETicaretAPI.Application.Abstractions.Services;
using MediatR;


namespace ETicaretAPI.Application.Features.Commands.Address.ChangeShowcaseAddress
{
    public class ChangeShowcaseAddressCommandHandler : IRequestHandler<ChangeShowcaseAddressCommandRequest, ChangeShowcaseAddressCommandResponse>
    {
        readonly IAddressService _addressService;

        public ChangeShowcaseAddressCommandHandler(IAddressService addressService)
        {
            _addressService = addressService;
        }

        public async Task<ChangeShowcaseAddressCommandResponse> Handle(ChangeShowcaseAddressCommandRequest request, CancellationToken cancellationToken)
        {
            await _addressService.ChangeShowCaseAddress(request.Id, request.UserId);

            return new();
        }
    }
}
