using MediatR;

namespace ETicaretAPI.Application.Features.Queries.AppUser.GetUserByToken
{
    public class GetUserByTokenQueryRequest :IRequest<GetUserByTokenQueryResponse>
    {
        public string RefreshToken { get; set; }
    }
}