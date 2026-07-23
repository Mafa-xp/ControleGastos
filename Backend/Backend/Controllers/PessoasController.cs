using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            return await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();
        }


        // POST: api/pessoas
        [HttpPost]
        public async Task<ActionResult<Pessoa>> CriarPessoa(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetPessoas),
                new { id = pessoa.Id },
                pessoa
            );
        }


        // DELETE: api/pessoas/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarPessoa(int id)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(p => p.Id == id);


            if (pessoa == null)
            {
                return NotFound();
            }


            // Remove todas as transações vinculadas
            _context.Transacoes.RemoveRange(pessoa.Transacoes);


            // Remove a pessoa
            _context.Pessoas.Remove(pessoa);


            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}