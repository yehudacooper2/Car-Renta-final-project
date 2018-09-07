
using BOL;
using BLL;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace WebApplication2.Filters
{
    public class BasicAuthFilter : Attribute, IAuthenticationFilter
    {
        public bool AllowMultiple { get { return false; } }


        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var authHead = context.Request.Headers.Authorization;
            if (authHead != null)
            {

                UserModel user = UserManager.GetUser(authHead.Scheme, authHead.Parameter);

                if (user != null)
                {
                    var claims = new List<Claim>() { new Claim(ClaimTypes.Name,user.UserName),
                                                     new Claim(ClaimTypes.Role, user.UserRole) };
                    var id = new ClaimsIdentity(claims, "Token");
                    context.Principal = new ClaimsPrincipal(new[] { id });
                }

                else
                {
                    context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                }
            }

            return Task.FromResult(0);
        }


        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}