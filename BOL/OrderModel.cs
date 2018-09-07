using System;
using System.ComponentModel.DataAnnotations;

namespace BOL
{
    public class OrderModel
    {
        [Required]
        public DateTime OrderStartDate { get; set; }
        [Required]
        public System.DateTime OrderReturnDate { get; set; }
        public Nullable<System.DateTime> OrderActualReturnDate { get; set; }
        [Required]
        public CarModel OrderCar { get; set; }
        [Required]
        public UserModel OrderUser { get; set; }
    }
}
