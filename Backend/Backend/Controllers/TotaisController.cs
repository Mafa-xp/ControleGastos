using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TotaisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TotaisController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<TotalDto>>> GetTotais()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();


            var resultado = pessoas.Select(p => new TotalDto
            {
                Nome = p.Nome,

                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == "Receita")
                    .Sum(t => t.Valor),

                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == "Despesa")
                    .Sum(t => t.Valor),

                Saldo = p.Transacoes
                    .Where(t => t.Tipo == "Receita")
                    .Sum(t => t.Valor)
                    -
                    p.Transacoes
                    .Where(t => t.Tipo == "Despesa")
                    .Sum(t => t.Valor)
            }).ToList();


            resultado.Add(new TotalDto
            {
                Nome = "TOTAL GERAL",

                TotalReceitas = resultado.Sum(x => x.TotalReceitas),

                TotalDespesas = resultado.Sum(x => x.TotalDespesas),

                Saldo = resultado.Sum(x => x.Saldo)
            });


            return resultado;
        }
    }
}