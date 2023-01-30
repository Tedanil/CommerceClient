using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class Address :BaseEntity
    {
        public string UserId { get; set; }       
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Title { get; set; }
        public string? PhoneNumber { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string? Neighborhood { get; set; }
        public string? Description { get; set; }
        public bool Showcase { get; set; }

        public AppUser User { get; set; }
        public ICollection<Order> Orders { get; set; }

    }
}
