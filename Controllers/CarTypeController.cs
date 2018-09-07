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
    public class CarTypeController : ApiController
    {
        // This function gets all carTypes by calling to the SelectAllCarTypes() function from the CarTypeManager. 

        // GET: api/CarType
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarTypeModel[]>(CarTypeManager.SelectAllCarTypes(), new JsonMediaTypeFormatter())
            };
        }
        // This function gets a specific carType by calling to the SelectCarTypeByModel() function from the CarTypeManager.  

        // GET: api/CarType/carModel
        [AllowAnonymous]
        public HttpResponseMessage Get(string carModel)
        {
            CarTypeModel carType = CarTypeManager.SelectCarTypeByModel(carModel);
            if (carType != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<CarTypeModel>(carType, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        //This function adds a new carType by calling the InsertCarType() function from the CarTypeManager.

        // POST: api/CarType
        public HttpResponseMessage Post([FromBody]CarTypeModel value)
        {
            bool insertResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                insertResult = CarTypeManager.InsertCarType(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }
        //This function updates a carType by calling the UpdateCarTypeByModel() function from the CarTypeManager.

        // PUT: api/CarType/carModel
        public HttpResponseMessage Put(string carModel, [FromBody]CarTypeModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = CarTypeManager.UpdateCarTypeByModel(carModel, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }
        //This function deletes a carType by calling the DeleteCarTypeByModel()  function from the CarTypeManager.

        // DELETE: api/CarType/carModel
        [Authorize(Roles = "manager")]

        public HttpResponseMessage Delete(string carModel)
        {
            bool deleteResult = CarTypeManager.DeleteCarTypeByModel(carModel);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
