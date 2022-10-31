using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.Queries.Product.GetByIdProduct
{
    public class GetByIdProductQueryResponse
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string CategoryName { get; set; }

        public int Stock { get; set; }

        public long Price { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public ICollection<Domain.Entities.ProductImageFile>? ProductImageFiles { get; set; }

        






    }
}
