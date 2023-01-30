using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Address.ChangeShowcaseAddress
{
    public class ChangeShowcaseAddressCommandRequest : IRequest<ChangeShowcaseAddressCommandResponse>
    {
        public string Id { get; set; }
        public string UserId { get; set; }
    }
}