using BOL;
using BLL;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Filters;

namespace _04_UIL.Controllers
{
    [Authorize(Roles = "manager,worker")]

    [BasicAuthFilter]
    // EnableCors: Initializes a new instance of the System.Web.Http.Cors.EnableCorsAttribute class.
    //
    // Parameters:
    //   origins: Comma-separated list of origins that are allowed to access the resource. Use "*" to allow all.
    //   headers: Comma-separated list of headers that are supported by the resource. Use "*" to allow all. Use null or empty string to allow none.
    //   methods: Comma-separated list of methods that are supported by the resource. Use "*" to allow all. Use null or empty string to allow none.
    [EnableCors("*", "*", "*")]
    public class CarController : ApiController
    {
        // This function gets all cars by calling to the SelectAllCars() function from the CarManager. 

        // GET: api/Car
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarManager.SelectAllCars(), new JsonMediaTypeFormatter())
            };
        }
        // This function gets a specific car by calling to the SelectCarByCarNumber() function from the CarManager.  

        // GET: api/Car/carNumber
        [AllowAnonymous]
        public HttpResponseMessage Get(string carNumber)
        {
            CarModel car = CarManager.SelectCarByCarNumber(carNumber);
            if (car != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<CarModel>(car, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        //This function adds a new car by calling the InsertCar() function from the CarManager.

        // POST: api/Car
        public HttpResponseMessage Post([FromBody]CarModel value)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                insertResult = CarManager.InsertCar(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }
        //This function updates a car by calling the UpdateCarByCarNumber() function from the CarManager.

        // PUT: api/Car/carNumber
        public HttpResponseMessage Put(string carNumber, [FromBody]CarModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = CarManager.UpdateCarByCarNumber(carNumber, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }
        //This function deletes a car by calling the DeleteCarByCarNumber()  function from the CarManager.

        // DELETE: api/Car/carNumber
        [Authorize(Roles = "manager")]

        public HttpResponseMessage Delete(string carNumber)
        {
            bool deleteResult = CarManager.DeleteCarByCarNumber(carNumber);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
