using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.entities;
using server.services;


namespace server.controllers
{
    [Route("[controller]")]
    public class ShopController : Controller
    {
        private readonly dbService _dbService;

        public ShopController(dbService dbService)
        {
            _dbService = dbService;
        }

        // POST: api/Shop
        [HttpPost]
        public async Task<IActionResult> AddReport([FromBody] Report item)
        {
            if (item == null || item.Date == default || item.Income < 0 || item.Outcome < 0)
            {
                return BadRequest("Invalid Report data.");
            }

            item.Id = Guid.NewGuid().ToString(); // Ensure a unique ID is assigned
            await _dbService.AddMonthlyReport(item);
            return Ok("Report added successfully.");
        }


        // GET: api/Shop
        [HttpGet]
        public async Task<IActionResult> GetAllReports([FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
        {
            try
            {
                var items = await _dbService.GetReportsAsync(from, to);

                if (items == null || items.Count == 0)
                {
                    return NotFound($"No reports found between {from?.ToString("yyyy-MM-dd") ?? "the default start date"} and {to?.ToString("yyyy-MM-dd") ?? "the default end date"}.");
                }
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching reports: {ex.Message}");
            }
        }
    }
}