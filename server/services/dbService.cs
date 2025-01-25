using MongoDB.Driver;
using server.entities;

namespace server.services
{
    public class dbService
    {
        private readonly IMongoDatabase _database;

        public dbService(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public async Task AddMonthlyReport(Report item)
        {
            var collection = _database.GetCollection<Report>("GroceryData");
            item.Id = Guid.NewGuid().ToString();
            await collection.InsertOneAsync(item);
        }

        public async Task<List<Report>> GetReportsAsync(DateTime? from = null, DateTime? to = null)
        {
            var collection = _database.GetCollection<Report>("GroceryData");

            // Set default dates if not provided
            var startDate = from ?? new DateTime(2021, 6, 1);
            var endDate = to ?? new DateTime(2022, 01, 01);

            // Filter documents based on date range
            var filter = Builders<Report>.Filter.And(
                Builders<Report>.Filter.Gte(item => item.Date, startDate),
                Builders<Report>.Filter.Lte(item => item.Date, endDate)
            );
            return await collection.Find(filter).ToListAsync();
        }
    }
}