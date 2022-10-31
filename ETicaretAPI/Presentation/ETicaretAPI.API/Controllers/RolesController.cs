using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Admin")]
    public class RolesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRoles()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetRoles(string id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult CreateRole()
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRole()
        {
            return Ok();
        }

        [HttpDelete("{name}")]
        public IActionResult DeleteRole()
        {
            return Ok();
        }

    }
}
