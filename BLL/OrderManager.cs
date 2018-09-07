using DAL;
using BOL;
using System;
using System.Linq;

namespace BLL
{
    static public class OrderManager
    {
        /// <summary>
        /// SelectAllOrders reads all the Orders from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        /// </summary>
        static public OrderModel[] SelectAllOrders()
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    return ef.Orders.Select(dbOrder => new OrderModel
                    {
                        OrderStartDate = dbOrder.startDate,
                        OrderReturnDate = dbOrder.returnDate,
                        OrderActualReturnDate = dbOrder.actualReturnDate,

                        OrderCar = new CarModel
                        {
                            CarNumber = dbOrder.Car.carNumber,
                            CarCurrentKilometerage = dbOrder.Car.currentKilometerage,
                            CarIsFitForRental = dbOrder.Car.isFitForRental,
                            CarImage = dbOrder.Car.image,

                            CarType = new CarTypeModel
                            {
                                DailyCost = dbOrder.Car.CarType.dailyCost,
                                DayDelayCost = dbOrder.Car.CarType.dayDelayCost,
                                Gear = dbOrder.Car.CarType.gear,
                                Manufacturer = dbOrder.Car.CarType.manufacturer,
                                ManufactureYear = dbOrder.Car.CarType.manufactureYear,
                                Model = dbOrder.Car.CarType.model,
                            },
                            CarBranch = new BranchModel
                            {
                                BranchAddress = dbOrder.Car.Branch.address,
                                BranchLatitude = dbOrder.Car.Branch.latitude,
                                BranchLongitude = dbOrder.Car.Branch.longitude,
                                BranchName = dbOrder.Car.Branch.branchName,
                            },
                        },
                        OrderUser = new UserModel
                        {
                            UserName = dbOrder.User.userName,
                            UserIdentityNumber = dbOrder.User.identityNumber,
                            UserFullName = dbOrder.User.fullName,
                            UserPassword = dbOrder.User.password,
                            UserGender = dbOrder.User.gender,
                            UserEmail = dbOrder.User.email,
                            UserBirthDay = dbOrder.User.birthDay,
                            UserImage = dbOrder.User.image,
                            UserRole = dbOrder.User.userRole,

                        }
                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        /// <summary>
        /// SelectOrderByCarNumber selects a specific Order from the DB by the EF ref
        /// by the `carNumber` parameter
        /// and maps the DAL object to BOL object
        /// </summary>
        static public OrderModel SelectOrderByCarNumber(string carNumber)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => dbOrder.Car.carNumber == carNumber);
                    if (selectedOrder == null)
                        return null;

                    return new OrderModel
                    {

                        OrderStartDate = selectedOrder.startDate,
                        OrderReturnDate = selectedOrder.returnDate,
                        OrderActualReturnDate = selectedOrder.actualReturnDate,

                        OrderCar = new CarModel
                        {
                            CarNumber = selectedOrder.Car.carNumber,
                            CarCurrentKilometerage = selectedOrder.Car.currentKilometerage,
                            CarIsFitForRental = selectedOrder.Car.isFitForRental,
                            CarImage = selectedOrder.Car.image,

                            CarType = new CarTypeModel
                            {
                                DailyCost = selectedOrder.Car.CarType.dailyCost,
                                DayDelayCost = selectedOrder.Car.CarType.dayDelayCost,
                                Gear = selectedOrder.Car.CarType.gear,
                                Manufacturer = selectedOrder.Car.CarType.manufacturer,
                                ManufactureYear = selectedOrder.Car.CarType.manufactureYear,
                                Model = selectedOrder.Car.CarType.model,
                            },
                            CarBranch = new BranchModel
                            {
                                BranchAddress = selectedOrder.Car.Branch.address,
                                BranchLatitude = selectedOrder.Car.Branch.latitude,
                                BranchLongitude = selectedOrder.Car.Branch.longitude,
                                BranchName = selectedOrder.Car.Branch.branchName,
                            },
                        },
                        OrderUser = new UserModel
                        {
                            UserName = selectedOrder.User.userName,
                            UserIdentityNumber = selectedOrder.User.identityNumber,
                            UserFullName = selectedOrder.User.fullName,
                            UserPassword = selectedOrder.User.password,
                            UserGender = selectedOrder.User.gender,
                            UserEmail = selectedOrder.User.email,
                            UserBirthDay = selectedOrder.User.birthDay,
                            UserImage = selectedOrder.User.image,
                            UserRole = selectedOrder.User.userRole,

                        }



                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }



        /// <summary>
        /// InsertOrder inserts a new Order to the DB by the EF ref
        /// maps the `newOrder` parameter (BOL object) to a `Order` (DAL object)
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool InsertOrder(OrderModel newOrder)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.userName == newOrder.OrderUser.UserName);
                    if (selectedUser == null)
                        return false;

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.carNumber == newOrder.OrderCar.CarNumber);
                    if (selectedCar == null)
                        return false;

                    Order newDbOrder = new Order
                    {
                        startDate = newOrder.OrderStartDate,
                        returnDate = newOrder.OrderReturnDate,
                        actualReturnDate = newOrder.OrderActualReturnDate,
                        carId = selectedCar.carId,
                        userId = selectedUser.userId,
                    };

                    ef.Orders.Add(newDbOrder);
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
        /// UpdateOrderByCarNumber updates a specific Order from the DB by the EF ref
        /// by the `carNumber` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool UpdateOrderByCarNumber(string carNumber, OrderModel newOrder)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.userName == newOrder.OrderUser.UserName);
                    if (selectedUser == null)
                        return false;

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.carNumber == newOrder.OrderCar.CarNumber);
                    if (selectedCar == null)
                        return false;

                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => dbOrder.Car.carNumber == carNumber);
                    if (selectedOrder == null)
                        return false;

                    selectedOrder.startDate = newOrder.OrderStartDate;
                    selectedOrder.returnDate = newOrder.OrderReturnDate;
                    selectedOrder.actualReturnDate = newOrder.OrderActualReturnDate;
                    selectedOrder.userId = selectedUser.userId;
                    selectedOrder.carId = selectedCar.carId;
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
        /// DeleteOrderByCarNumber deletes a specific Order from the DB by the EF ref
        /// by the `carNumber` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool DeleteOrderByCarNumber(string carNumber)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => dbOrder.Car.carNumber == carNumber);
                    if (selectedOrder == null)
                        return false;

                    ef.Orders.Remove(selectedOrder);
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
