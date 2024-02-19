using IPRegistreringAPI.EntityFrameworkCore.Models;
using Microsoft.EntityFrameworkCore;

namespace IPRegistreringAPI.EntityFrameworkCore
{
    public class AppDbContext : DbContext
    {
        public DbSet<IPAddress> IPAddresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("IPDatabase");
        }
    }
}
