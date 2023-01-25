using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Repositories
{
    public class DistrictWriteRepository : WriteRepository<District>, IDistrictWriteRepository
    {
        public DistrictWriteRepository(ETicaretAPIDbContext context) : base(context)
        {
        }
    }
}
