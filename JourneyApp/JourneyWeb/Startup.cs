using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JourneyWeb.Startup))]
namespace JourneyWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
