using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace versta24
{
    public class Order
    {
        public int? id { get; set; }
        public string? orderid { get; set; }
        public string? addressFrom { get;set; }
        public string? cityFrom { get; set; }
        public string? addressTo { get;set; }
        public string? cityTo { get; set; }
        public string? colldate { get; set; }
        public string? date { get; set; }
        public string? weight { get; set; }
    }
    public class DatabaseContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=db.db");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().ToTable("Orders");
        }
    }
    public class DataBase
    {
        public DatabaseContext db = new DatabaseContext();
        public List<Order> getAllOrders()
        {
            return db.Orders.ToList();
        }
        public Order GetOrder(string id)
        {
            return db.Orders.FirstOrDefault(o => o.orderid == id);
        }
    }
}
