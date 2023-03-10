using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VisitsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Visitas
        [HttpGet]
        public async Task<ActionResult<List<DataVisit>>> ObtenerUsuarios()
        {
            var datos = from v in this._context.Visita
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        select new DataVisit
                        {
                            id = v.id,
                            actividad = v.lugar,
                            observaciones = v.observaciones,
                            lugar = v.lugar,
                            tipo = v.tipo,
                            fecha = v.fecha,
                            nombrePersona = p.nombrePersona,
                            apellidoPersona = p.apellidoPersona,
                            ciPersona = p.ciPersona,
                            celularPersona = p.celularPersona,
                            nombreInstitucion = i.Nombre,
                            estado = v.estado
                        };
            return await datos.ToListAsync();
        }

        // POST: api/Visitas
        [HttpPost]
        public async Task<ActionResult<List<Visita>>> AgregarInstitucion(Visita visita)
        {
            Visita inst = await _context.Visita.FirstOrDefaultAsync(x => x.id == visita.id);
            if (inst != null)
            {
                return BadRequest("Esta Visita ya existe");
            }
            else
            {
                _context.Visita.Add(visita);
                await _context.SaveChangesAsync();
                return Ok();

            }
        }

        //PUT: api/Visitas
        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Visita>>> EditarInstituciones(int id, Visita visita)
        {
            Visita v = await _context.Visita.FirstOrDefaultAsync(x => x.id == id);
            if (v == null)
            {
                return BadRequest("No se encontro la visita");
            }
            else
            {
                v.actividad = visita.actividad;
                v.observaciones = visita.observaciones;
                v.lugar = visita.lugar;
                v.tipo = visita.tipo;
                v.fecha = visita.fecha;
                v.Persona = visita.Persona;
                v.Institucion = visita.Institucion;
                v.estado = visita.estado;
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult> EliminarLogico(int id, Visita visita)
        {
            Visita v = await _context.Visita.FirstOrDefaultAsync(x => x.id == id);
            if (v != null)
            {
                v.estado = visita.estado;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No existe la visita a eliminar");
            }
        }

    }
}
