using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JourneyWeb.Models
{
    public class Trip
    {
        public int Id { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
        [JsonIgnore]
        public virtual Vehicle Vehicle { get; set; }
        public DateTime TripDate { get; set; }
        public int OdometerStart { get; set; }
        public int OdometerStop { get; set; }
        public string AddressStart { get; set; }
        public string AddressStop { get; set; }
        public string Errand { get; set; }
        public string Note { get; set; }
        public bool Active { get; set; }

        /*public Trip()
        {
            UserId = User.Id;
        }*/
    }
}