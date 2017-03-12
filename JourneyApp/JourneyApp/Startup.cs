using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JourneyApp.Startup))]
namespace JourneyApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
