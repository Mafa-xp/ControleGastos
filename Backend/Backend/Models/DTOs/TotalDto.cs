namespace Backend.Models.DTOs
{
    public class TotalDto
    {
        public string Nome { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }

        public decimal TotalDespesas { get; set; }

        public decimal Saldo { get; set; }
    }
}
