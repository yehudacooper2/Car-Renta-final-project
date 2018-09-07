using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using BOL;
namespace BOL
{
    //This function checks if the identity number is a correct one and returns true or false.
    public class IdentityValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string a;
            double sum = 0;
            double incNum = 0;
            a = Convert.ToString(value);

            if (a.Length < 9)
            {
                while (a.Length < 9)
                {
                    a = '0' + a;
                }
            }
            for (int i = 0; i < 9; i++)
            {
                incNum = Convert.ToUInt32(a[i].ToString());
                incNum *= ((i % 2) + 1);
                if (incNum > 9)
                    incNum -= 9;
                sum += incNum;
            }
            if (sum % 10 == 0)
                return true;
            else
                return false;

        }
    }
}