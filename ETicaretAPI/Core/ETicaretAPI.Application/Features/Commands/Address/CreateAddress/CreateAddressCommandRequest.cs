using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Address.CreateAddress
{
    public class CreateAddressCommandRequest : IRequest<CreateAddressCommandResponse>
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Neighborhood { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int SelectCity { get; set; }
        public int SelectDistrict { get; set; }

    }
}