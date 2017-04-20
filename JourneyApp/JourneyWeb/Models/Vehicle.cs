using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace JourneyWeb.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
        public string NumberPlate { get; set;}
        public bool Active { get; set; } //Checks if car is active (in use)
        public int Odometer { get; set; }
        public string Note { get; set; }

        /*public Vehicle()
        {
            UserId = User.Id;
        }*/
    }
}