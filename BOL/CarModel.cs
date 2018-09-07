using System.ComponentModel.DataAnnotations;

namespace BOL
{
    public class CarModel
    {
        [Required]
        public int CarCurrentKilometerage { get; set; }
        public string CarImage { get; set; }
        [Required]
        public bool CarIsFitForRental { get; set; }
        [Required]
        public string CarNumber { get; set; }
        [Required]
        public BranchModel CarBranch { get; set; }
        [Required]
        public CarTypeModel CarType { get; set; }
    }
}
