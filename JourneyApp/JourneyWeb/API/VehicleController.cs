using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using JourneyWeb.Models;
using Microsoft.AspNet.Identity;
//using System.Web.Mvc;

namespace JourneyWeb.Controllers
{
    public class VehicleController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        [Authorize]
        public IEnumerable<Vehicle> Get()
        {
            var userId = User.Identity.GetUserId();
            var getVehicleList = db.Vehicle.Where(x => x.User.Id == userId).OrderByDescending(x => x.Active).ThenBy(x => x.NumberPlate).ToList();

            return getVehicleList;
        }

        public IEnumerable<Vehicle> Get(string userId)
        {
            return null;
        }
    }
}