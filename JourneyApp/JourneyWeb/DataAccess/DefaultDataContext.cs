using System.Data.Entity;
using JourneyWeb.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;

namespace JourneyWeb.DataAccess
{
    public class DefaultDataContext : DbContext
    {
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<Trip> Trips { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}