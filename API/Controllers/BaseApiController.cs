using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    // GET =>localhost..../api/{whatever is using this }
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}