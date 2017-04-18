using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using JourneyWeb.Models;
//using System.Web.Mvc;

namespace JourneyWeb.Controllers
{
    public class VehicleController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();


        /*List<Vehicle> _vehicles = new List<Vehicle>()
        {
            new Vehicle { Id = 1, User = null, NumberPlate = "xem225", Active = true, Odometer = 276544, Note = null },
            new Vehicle { Id = 2, User = null, NumberPlate = "fke992", Active = true, Odometer = 276544, Note = null },
            new Vehicle { Id = 3, User = null, NumberPlate = "ljf541", Active = true, Odometer = 276544, Note = null }
        };

        [HttpGet]
        public IEnumerable<Vehicle> GetAllVehicles()
        {
            return _vehicles;
        }*/
        [HttpGet]
        public IEnumerable<Vehicle> Get()
        {
            //var getVehicleList = db.Vehicle.OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            var getVehicleList = db.Vehicle.Include(x => x.User).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            //var getVehicleList = db.Vehicle.OrderBy(x => x.Active).ThenBy(x => x.NumberPlate);
            return getVehicleList;
        }

        //Return vehicles that belong to user
        /*public Vehicle Get(string userId)
        {
            return db.Vehicle.FirstOrDefault(x => x.User.Id == userId);
        }*/
        /*/ GET: Vehicle
        public ActionResult Index()
        {
            return View();
        }*/
    }
}