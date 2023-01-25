using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class District : BaseEntity
    {
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string? DistrictName { get; set; }


        [NotMapped]
        public override Guid Id { get => base.Id; set => base.Id = value; }
        [NotMapped]
        public override DateTime UpdatedDate { get => base.UpdatedDate; set => base.UpdatedDate = value; }

        [NotMapped]
        public override DateTime CreatedDate { get => base.CreatedDate; set => base.CreatedDate = value; }
    }
}
