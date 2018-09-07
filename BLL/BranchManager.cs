using DAL;
using BOL;
using System;
using System.Linq;

namespace BLL
{
    static public class BranchManager
    {
        /// <summary>
        /// SelectAllBranches reads all the Branches from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        /// </summary>
        static public BranchModel[] SelectAllBranches()
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    return ef.Branches.Select(dbBranch => new BranchModel
                    {
                        BranchAddress = dbBranch.address,
                        BranchLatitude = dbBranch.latitude,
                        BranchLongitude = dbBranch.longitude,
                        BranchName = dbBranch.branchName,
                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }




        /// <summary>
        /// SelectBranchByName selects a specific Branch from the DB by the EF ref
        /// by the `branchName` parameter
        /// and maps the DAL object to BOL object
        /// </summary>
        static public BranchModel SelectBranchByName(string branchName)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Branch selectedBranch = ef.Branches.FirstOrDefault(dbUser => dbUser.branchName == branchName);
                    if (selectedBranch == null)
                        return null;

                    return new BranchModel
                    {
                        BranchAddress = selectedBranch.address,
                        BranchLatitude = selectedBranch.latitude,
                        BranchLongitude = selectedBranch.longitude,
                        BranchName = selectedBranch.branchName,

                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// InsertBranch inserts a new Branch to the DB by the EF ref
        /// maps the `newBranch` parameter (BOL object) to a `Branch` (DAL object)
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool InsertBranch(BranchModel newBranch)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    Branch newDbBranch = new Branch
                    {
                        address = newBranch.BranchAddress,
                        latitude = newBranch.BranchLatitude,
                        longitude = newBranch.BranchLongitude,
                        branchName = newBranch.BranchName,

                    };

                    ef.Branches.Add(newDbBranch);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        /// <summary>
        /// UpdateBranchByName updates a specific Branch from the DB by the EF ref
        /// by the `branchName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool UpdateBranchByName(string branchName, BranchModel newBranch)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Branch selectedBranch = ef.Branches.FirstOrDefault(dbBranch => dbBranch.branchName == branchName);
                    if (selectedBranch == null)
                        return false;

                    selectedBranch.address = newBranch.BranchAddress;
                    selectedBranch.latitude = newBranch.BranchLatitude;
                    selectedBranch.longitude = newBranch.BranchLongitude;
                    selectedBranch.branchName = newBranch.BranchName;


                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        /// <summary>
        /// DeleteBranchByName delete a specific Branch from the DB by the EF ref
        /// by the `branchName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool DeleteBranchByName(string branchName)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Branch selectedBranch = ef.Branches.FirstOrDefault(dbBranch => dbBranch.branchName == branchName);
                    if (selectedBranch == null)
                        return false;

                    ef.Branches.Remove(selectedBranch);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
