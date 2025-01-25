namespace server.entities
{
    public class Report
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Income { get; set; }
        public decimal Outcome { get; set; }
        public decimal ClearRevenue => Income - Outcome;
    }
}