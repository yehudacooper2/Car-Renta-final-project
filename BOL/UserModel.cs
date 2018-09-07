using System;
using System.ComponentModel.DataAnnotations;
namespace BOL
{
    public class UserModel
    {
        [Required]
        public string UserFullName { get; set; }
        [IdentityValidation][Required][MinLength(9)][MaxLength(9)]
        public string UserIdentityNumber { get; set; }
        [Required]
        public string UserName { get; set; }
        public Nullable<System.DateTime> UserBirthDay { get; set; }
        [Required]
        public bool UserGender { get; set; }
        [EmailAddress][Required]
        public string UserEmail { get; set; }
        [Required]
        public string UserPassword { get; set; }
        public string UserRole { get; set; }
        public string UserImage { get; set; }
    }
}
