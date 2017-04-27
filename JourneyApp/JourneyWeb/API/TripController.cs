using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using JourneyWeb.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace JourneyWeb.Controllers
{
    public class TripController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();
        protected UserManager<ApplicationUser> UserManager { get; set; }
        //protected ApplicationDbContext ApplicationDbContext { get; set; }

        public TripController()
        {
            UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.db));
        }

        [Authorize]
        public IEnumerable<Trip> Get()
        {
            //var userId = User.Identity.GetUserId();
            //var getVehicleList = db.Trip.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            var getTripList = db.Trip.Include(x => x.Vehicle).OrderByDescending(x => x.Active).ToList();

            return getTripList;

        }

        [Authorize]
        public Trip Get(int id)
        {
            //var userId = User.Identity.GetUserId();
            //var getVehicleList = db.Trip.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            return db.Trip.FirstOrDefault(x => x.Id == id);
        }

        //api/{controller}/{id}
        [Route("api/Trip/getAll/{id}")]
        [HttpGet]
        public IEnumerable<Trip> GetAllTrips(int id)
        {
            var getTripList = db.Trip.Include(x => x.Vehicle).Where(x => x.Vehicle.Id == id).ToList();

            return getTripList;
        }

        [Authorize]
        public string Post(Trip trip)
        {
            if (trip.Id > 0) // Save
            {
                db.Entry(trip).State = EntityState.Modified;
            }
            else // Add
            {
                var vehicle = db.Vehicle.Find(trip.VehicleId);
                trip.Vehicle = vehicle;
                ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
                trip.User = user;
                db.Trip.Add(trip);
            }

            db.SaveChanges();
            return string.Format("Trip successfully started");

        }

        /*public IEnumerable<Vehicle> Post(Vehicle vehicle)
         {
             return null;
         }*/
    }
}