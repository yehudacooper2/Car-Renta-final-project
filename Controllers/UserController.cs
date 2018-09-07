using BOL;
using BLL;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Filters;
using System.Linq;

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
    public class UserController : ApiController
    {
        // This function gets all users by calling to the SelectAllUsers() function from the UserManager. 
        // GET: api/User
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel[]>(UserManager.SelectAllUsers(), new JsonMediaTypeFormatter())
            };
        }
        // This function gets a specific user by calling to the SelectUserByName() function from the UserManager.  
        // GET: api/User/userName
        [AllowAnonymous]
        public HttpResponseMessage Get(string userName)
        {
            UserModel user = UserManager.SelectUserByName(userName);
            if (user != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<UserModel>(user, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }
        //This function adds a new user by calling the InsertUser() function from the UserManager.
        //POST  : api/User
        [AllowAnonymous]

        public HttpResponseMessage Post([FromBody]UserModel value)
        {
            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                UserManager.InsertUser(value);
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
            string errorMsg = "";

            foreach (var error in ModelState.Values)
            {
                errorMsg += error.Errors.FirstOrDefault().ErrorMessage;
            }
            return new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent(errorMsg) };
        }

        //This function updates a user by calling the UpdateUserByName() function from the UserManager.

        // PUT: api/User/userName
        public HttpResponseMessage Put(string userName, [FromBody]UserModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = UserManager.UpdateUserByName(userName, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        //This function deletes a user by calling the DeleteUserByName(userName)  function from the UserManager.
        // DELETE: api/User/userName
        [Authorize(Roles = "manager")]

        public HttpResponseMessage Delete(string userName)
        {
            bool deleteResult = UserManager.DeleteUserByName(userName);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
