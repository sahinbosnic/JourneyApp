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
            //this.ApplicationDbContext = new ApplicationDbContext();
            //this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.ApplicationDbContext));
        }

        [Authorize]
        public IEnumerable<Trip> Get()
        {
            //var userId = User.Identity.GetUserId();
            //var getVehicleList = db.Trip.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            var getTripList = db.Trip.ToList();

            return getTripList;

        }

        [Authorize]
        public Trip Get(int id)
        {
            //var userId = User.Identity.GetUserId();
            //var getVehicleList = db.Trip.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();
            return db.Trip.FirstOrDefault(x => x.Id == id);

        }

        //[Authorize]
        public string Post(Trip trip)
        {
            if (trip.Id > 0) // Save
            {
                db.Entry(trip).State = EntityState.Modified;
            }
            else // Add
            {
                db.Trip.Add(trip);
            }

            db.SaveChanges();
            return string.Format("seems to work!");

            //var userId = User.Identity.GetUserId();
            /*Trip tripToUpdate = null;

            if (trip.Id > 0) // Update
            {
                //tripToUpdate = db.Trip.Include(x => x.User).First(i => i.Id == trip.Id);
                db.Entry(trip).State = EntityState.Modified;
            }
            else // New
            {
                //var userId = User.Identity.GetUserId();
                //var user = UserManager.FindById(User.Identity.GetUserId());
                ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(System.Web.HttpContext.Current.User.Identity.GetUserId());

                tripToUpdate = new Trip();
                tripToUpdate.User = user;
                tripToUpdate.TripDate = trip.TripDate;
                tripToUpdate.OdometerStart = trip.OdometerStart;
                tripToUpdate.OdometerStop = trip.OdometerStop;
                tripToUpdate.AddressStart = trip.AddressStart;
                tripToUpdate.AddressStop = trip.AddressStop;
                tripToUpdate.Errand = trip.Errand;
                tripToUpdate.Active = trip.Active;

                db.Trip.Add(tripToUpdate);
            }

            db.SaveChanges();

            return string.Format("seems to work!");*/
        }

        /*public IEnumerable<Vehicle> Post(Vehicle vehicle)
         {
             return null;
         }*/
    }
}