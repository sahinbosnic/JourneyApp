using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using JourneyWeb.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace JourneyWeb.Controllers
{
    public class VehicleController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();
        protected UserManager<ApplicationUser> UserManager { get; set; }
        //protected ApplicationDbContext ApplicationDbContext { get; set; }

        public VehicleController()
        {
            UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.db));
        }

        [Authorize]
        public IEnumerable<Vehicle> Get()
        {
            var userId = User.Identity.GetUserId();
            var getVehicleList = db.Vehicle.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();

            return getVehicleList;
        }

        [Authorize]
        public void Post(Vehicle vehicle)
        {
            if (vehicle.Id > 0) // Save
            {
                db.Entry(vehicle).State = EntityState.Modified;
            }
            else // Add
            {
                ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
                vehicle.User = user;
                db.Vehicle.Add(vehicle);
            }

            db.SaveChanges();

        }

        [Authorize][AcceptVerbs("DELETE")]
        public void Delete(int id)
        {
            var vehicle = db.Vehicle.Find(id);
            db.Vehicle.Remove(vehicle);

            db.SaveChanges();
        }
    }
}