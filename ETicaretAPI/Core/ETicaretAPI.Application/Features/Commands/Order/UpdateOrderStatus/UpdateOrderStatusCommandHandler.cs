using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Commands.Order.UpdateOrderStatus
{
    public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommandRequest, UpdateOrderStatusCommandResponse>
    {
        readonly IOrderWriteRepository _orderWriteRepository;

        public UpdateOrderStatusCommandHandler(IOrderWriteRepository orderWriteRepository)
        {
            _orderWriteRepository = orderWriteRepository;
        }

        public async Task<UpdateOrderStatusCommandResponse> Handle(UpdateOrderStatusCommandRequest request, CancellationToken cancellationToken)
        {
            var order =  _orderWriteRepository.Table.FirstOrDefault(o => o.Id == Guid.Parse(request.Id));

            order.Status = (OrderStatus)Enum.Parse(typeof(OrderStatus), request.SelectStatus);

            await _orderWriteRepository.SaveAsync();

            return new();
        }
    }
}
