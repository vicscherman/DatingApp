using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    // GET =>localhost..../api/{whatever is using this }
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}
