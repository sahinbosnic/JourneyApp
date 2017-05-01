using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JourneyWeb.Controllers
{
    public class JourneyController : Controller
    {
        ILog log = log4net.LogManager.GetLogger(typeof(HomeController));
        // GET: Journey
        public ActionResult Index()
        {
            log.Debug("Debug message");
            log.Warn("Warn message");
            log.Error("Error message");
            log.Fatal("Fatal message");
            return View();
        }
    }
}
