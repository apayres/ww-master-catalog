using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterCatalog.Dal.DataTransferObjects
{
    [Table("UnitOfMeasure")]
    internal class UnitOfMeasureDTO
    {
        [Key]
        public int UnitOfMeasureID { get; set; }

        public string UnitOfMeasureName { get; set; }

        public string UnitOfMeasureDescription { get; set; }
    }
}
