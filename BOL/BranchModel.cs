using System.ComponentModel.DataAnnotations;

namespace BOL
{
    public class BranchModel
    {
        [Required]
        public string BranchAddress { get; set; }
        [Required]
        public int BranchLatitude { get; set; }
        [Required]
        public int BranchLongitude { get; set; }
        [Required]
        public string BranchName { get; set; }
    }
}
