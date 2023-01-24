using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Address.CreateAddress
{
    public class CreateAddressCommandRequest : IRequest<CreateAddressCommandResponse>
    {
        public string UserId { get; set; }
        public string City { get; set; }
        public string District { get; set; }
    }
}