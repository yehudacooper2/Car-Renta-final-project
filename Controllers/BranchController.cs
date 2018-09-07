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
    public class BranchController : ApiController
    {

        // GET: api/Branch
        [AllowAnonymous]

        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<BranchModel[]>(BranchManager.SelectAllBranches(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Branch/branchName
        [AllowAnonymous]

        public HttpResponseMessage Get(string branchName)
        {
            BranchModel branch = BranchManager.SelectBranchByName(branchName);
            if (branch != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<BranchModel>(branch, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }


    }
}
