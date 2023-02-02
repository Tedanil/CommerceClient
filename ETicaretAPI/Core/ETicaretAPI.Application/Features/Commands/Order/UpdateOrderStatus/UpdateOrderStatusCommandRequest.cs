using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Order.UpdateOrderStatus
{
    public class UpdateOrderStatusCommandRequest : IRequest<UpdateOrderStatusCommandResponse>
    {
        public string Id { get; set; }
        public string SelectStatus { get; set; }
    }
}