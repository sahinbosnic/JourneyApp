using JourneyWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;

namespace JourneyWeb.Controllers
{
    public class VehicleController : ApiController
    {
        //private DefaultDataContext db = new DefaultDataContext();
        List<Vehicle> _vehicles = new List<Vehicle>()
        {
            new Vehicle { Id = 1, User = null, NumberPlate = "xem225", Active = true, Odometer = 276544, Note = null },
            new Vehicle { Id = 2, User = null, NumberPlate = "fke992", Active = true, Odometer = 276544, Note = null },
            new Vehicle { Id = 3, User = null, NumberPlate = "ljf541", Active = true, Odometer = 276544, Note = null }
        };

        [HttpGet]
        public IEnumerable<Vehicle> GetAllVehicles()
        {
            return _vehicles;
        }

        /*/ GET: Vehicle
        public ActionResult Index()
        {
            return View();
        }*/
    }
}