using Microsoft.AspNetCore.Mvc;

namespace API_SERVER_CEA.Controllers
{
    public class ImageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
