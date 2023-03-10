using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitucionController : ControllerBase
    {
        private readonly ApplicationContext contexto;

        public InstitucionController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<Institucion>>> AgregarInstitucion(Institucion institution)
        {
            Institucion inst = await contexto.Institucion.FirstOrDefaultAsync(x => x.Nombre == institution.Nombre);
            if (inst != null)
            {
                return BadRequest("Este institucion ya existe");
            }
            else
            {
                contexto.Institucion.Add(institution);
                await contexto.SaveChangesAsync();
                return Ok();

            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Institucion>>> ObtenerInstituciones(){

            return await contexto.Institucion.ToListAsync(); 
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Institucion>>> EditarInstituciones(int id, Institucion institution)
        {
            Institucion ins =await contexto.Institucion.FirstOrDefaultAsync(x=>x.Id == id); 
            if (ins == null)
            {
                return BadRequest("No se encontro la Institucion");
            }
            else
            {
                ins.Nombre = institution.Nombre;
                ins.Tipo = institution.Tipo;
                ins.Estado = institution.Estado;
                await contexto.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            Institucion existe = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
            if (existe != null)
            {
                contexto.Remove(existe);
                await contexto.SaveChangesAsync();
                return Ok();
            }
            else { return BadRequest("El acta de congreso a eliminar no existe"); }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Institucion>>> ObtenerInstitucion(int id)
        {

            var institucion= await contexto.Institucion.FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(institucion);
        }

        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult> EliminarLogico(int id, Institucion institucion)
        {
            Institucion ins = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
            if (ins != null)
            {
                ins.Estado = institucion.Estado;
                await contexto.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No existe la institucion a eliminar");
            }
        }

    }
}
