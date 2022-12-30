namespace ETicaretAPI.Application.Features.Queries.AppUser.GetUserByToken
{
    public class GetUserByTokenQueryResponse
    {
        public string? NameSurname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}