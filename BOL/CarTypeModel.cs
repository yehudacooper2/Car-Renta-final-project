using System.ComponentModel.DataAnnotations;

namespace BOL
{
    public class CarTypeModel
    {
        [Required]
        public string Manufacturer { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public decimal DailyCost { get; set; }
        [Required]
        public decimal DayDelayCost { get; set; }
        [Required]
        public int ManufactureYear { get; set; }
        [Required]
        public bool Gear { get; set; }
    }
}
