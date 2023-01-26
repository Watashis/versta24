using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace versta24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public static DataBase db = new DataBase();
        [HttpGet]
        public IEnumerable<Order> Get()
        {            
            return db.getAllOrders().ToArray();
        }
        [HttpGet("{id}")]
        public Order GetQuery(string id)
        {
            return db.GetOrder(id);
        }
        [HttpPost("create")]
        public string Post([FromBody] Order data)
        {
            data.date = DateTime.Now.ToString();
            data.orderid = ((DateTimeOffset)DateTime.Now).ToUnixTimeSeconds().ToString();
            var a = db.db.Add(data);
            var b = db.db.SaveChanges();
            return data.orderid;
        }
    }


}
