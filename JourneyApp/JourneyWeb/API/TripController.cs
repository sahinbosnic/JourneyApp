using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using JourneyWeb.Models;
using Microsoft.AspNet.Identity;

namespace JourneyWeb.Controllers
{
    public class TripController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Trip> Get()
        {
            var getTripList = db.Trip.ToList();

            return getTripList;
        }

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
        }

        /*public IEnumerable<Vehicle> Post(Vehicle vehicle)
         {
             return null;
         }*/
    }
}