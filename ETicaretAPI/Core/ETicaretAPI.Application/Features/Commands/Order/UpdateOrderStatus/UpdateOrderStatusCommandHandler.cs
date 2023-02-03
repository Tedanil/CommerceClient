using ETicaretAPI.Application.Abstractions.Services;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        readonly IMailService _mailService;

        public UpdateOrderStatusCommandHandler(IOrderWriteRepository orderWriteRepository, IMailService mailService)
        {
            _orderWriteRepository = orderWriteRepository;
            _mailService = mailService;
        }

        public async Task<UpdateOrderStatusCommandResponse> Handle(UpdateOrderStatusCommandRequest request, CancellationToken cancellationToken)
        {
            var order =  _orderWriteRepository.Table.Include(o => o.Basket)
                .ThenInclude(b => b.User).FirstOrDefault(o => o.Id == Guid.Parse(request.Id));

            var email = order.Basket.User.Email;
            var userName = order.Basket.User.UserName;
            var orderCode = order.OrderCode;

            order.Status = (OrderStatus)Enum.Parse(typeof(OrderStatus), request.SelectStatus);

            if(order.Status == OrderStatus.Shipped) {

                await _mailService.SendShippedInfoMailAsync(email, orderCode, userName);
            }

            await _orderWriteRepository.SaveAsync();

            return new();
        }
    }
}
