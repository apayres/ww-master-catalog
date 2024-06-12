using MasterCatalog.Web.Models.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace MasterCatalog.Web.Authentication
{
    public class MasterCatalogAuthSchemeHandler : AuthenticationHandler<MasterCatalogAuthSchemeOptions>
    {

        public MasterCatalogAuthSchemeHandler(
            IOptionsMonitor<MasterCatalogAuthSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder) : base(options, logger, encoder)
        {
        }

        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var serializedUser = Request.HttpContext.Session.Get("AUTH_USER");
            if (serializedUser == null)
            {
                return AuthenticateResult.Fail("No session user.");
            }

            var appUser = (ApplicationUser)JsonSerializer.Deserialize(new ReadOnlySpan<byte>(serializedUser), typeof(ApplicationUser));
            if (appUser == null)
            {
                return AuthenticateResult.Fail("Session user not in the correct format.");
            }

            var identity = new ClaimsIdentity(new List<Claim>
            {
                new Claim(ClaimTypes.Name, appUser.UserName),
                new Claim(ClaimTypes.Surname, appUser.LastName),
                new Claim(ClaimTypes.GivenName, appUser.FirstName)
            }, "Basic");

            var principle = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principle, Scheme.Name);
            return AuthenticateResult.Success(ticket);
        }
    }
}
