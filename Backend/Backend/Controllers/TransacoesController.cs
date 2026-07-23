using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/transacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .ToListAsync();
        }


        // POST: api/transacoes
        [HttpPost]
        public async Task<ActionResult<Transacao>> CriarTransacao(Transacao transacao)
        {
            var pessoa = await _context.Pessoas
                .FindAsync(transacao.PessoaId);


            if (pessoa == null)
            {
                return BadRequest("Pessoa não encontrada.");
            }


            // REGRA PRINCIPAL DO DESAFIO
            if (pessoa.Idade < 18 && transacao.Tipo == "Receita")
            {
                return BadRequest(
                    "Menores de idade só podem ter despesas."
                );
            }


            _context.Transacoes.Add(transacao);

            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(GetTransacoes),
                new { id = transacao.Id },
                transacao
            );
        }


        // DELETE: api/transacoes/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarTransacao(int id)
        {
            var transacao = await _context.Transacoes
                .FindAsync(id);


            if (transacao == null)
            {
                return NotFound();
            }


            _context.Transacoes.Remove(transacao);

            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}