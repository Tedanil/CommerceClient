using ETicaretAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Order.GetOrdersByUserName
{
    public class GetOrdersByUserNameQueryHandler : IRequestHandler<GetOrdersByUserNameQueryRequest, GetOrdersByUserNameQueryResponse>
    {
        readonly IOrderService _orderService;

        public GetOrdersByUserNameQueryHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetOrdersByUserNameQueryResponse> Handle(GetOrdersByUserNameQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _orderService.GetOrdersByUserName(request.Page, request.Size, request.UserName);

            return new()
            {
                TotalOrderCount = data.TotalOrderCount,
                Orders = data.Orders
            };
        }
    }
}
