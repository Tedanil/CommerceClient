using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.DTOs.Product
{
    public class CreateProduct
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string CategoryName { get; set; }

        public int Stock { get; set; }

        public float Price { get; set; }
    }
}
