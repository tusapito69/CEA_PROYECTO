using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Authorization;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using System.Reflection;
using System.Data;
using DocumentFormat.OpenXml.Office2010.Excel;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class VisitsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VisitsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Visitas
        [HttpGet]
        public async Task<ActionResult<List<Visita>>> ObtenerVisitas()
        {
            var datos = from v in this._context.Visita
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        select new Visita
                        {
                            id = v.id,
                            actividad = v.lugar,
                            observaciones = v.observaciones,
                            lugar = v.lugar,
                            tipo = v.tipo,
                            email = v.email,
                            fecha = v.fecha,
                            estado = v.estado,
                            Persona = v.Persona,
                            Institucion = v.Institucion
                        };
            return await datos.ToListAsync();
        }
        // GET: api/Visitas id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Visita>>> ObtenerVisita(int id)
        {
            var datos = from v in this._context.Visita
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        where v.id == id
                        select new Visita
                        {
                            id = v.id,
                            actividad = v.lugar,
                            observaciones = v.observaciones,
                            lugar = v.lugar,
                            tipo = v.tipo,
                            email = v.email,
                            fecha = v.fecha,
                            estado = v.estado,
                            Persona = v.Persona,
                            Institucion = v.Institucion
                        };
            return await datos.ToListAsync();
        }


        // POST: api/Visitas
        [HttpPost]
        public async Task<ActionResult<List<Visita>>> AgregarVisita(Visita visita)
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
        public async Task<ActionResult<List<Visita>>> EditarVisita(int id, Visita visita)
        {
            Visita v = await _context.Visita.FirstOrDefaultAsync(x => x.id == id);
            Persona p = await _context.Persona.FirstOrDefaultAsync(x => x.Id == v.PersonaId);
            Institucion i = await _context.Institucion.FirstOrDefaultAsync(x => x.Id == v.InstitucionId);
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
                v.email = visita.email;
                v.fecha = visita.fecha;
                v.estado = visita.estado;
                v.InstitucionId = visita.InstitucionId;
                //p.Id = visita.Persona.Id;
                p.nombrePersona = visita.Persona.nombrePersona;
                p.apellidoPersona = visita.Persona.apellidoPersona;
                p.edadPersona = visita.Persona.edadPersona;
                p.ciPersona = visita.Persona.ciPersona;
                p.celularPersona = visita.Persona.celularPersona;
                p.estadoPersona = visita.Persona.estadoPersona;

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

        [HttpPost("reporte")]
        public IActionResult Exportar_Excel(Reporte reporte)
        {
            var query = from v in _context.Visita
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        where v.fecha >= reporte.FechaInicio &&
                            v.fecha <= reporte.FechaFinal && v.estado == 1
                        select new DataVisit
                        {
                            id=v.id,
                            actividad=v.actividad, 
                            observaciones=v.observaciones,
                            lugar=v.lugar,
                            tipo=v.tipo,
                            fecha=v.fecha,
                            nombrePersona=p.nombrePersona,
                            apellidoPersona=p.apellidoPersona,
                            ciPersona=p.ciPersona,
                            celularPersona=p.celularPersona,
                            email=v.email,
                            nombreInstitucion=i.Nombre

                        };
            //Crea un tabla a partir del modelo intitucion
            DataTable? tabla = new DataTable(typeof(DataVisit).Name);

            //Toma las propiedades de Institucion y las asigna a la variable props
            PropertyInfo[] props = typeof(DataVisit).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            //Añade las propiedades alas columnas en base a su tipo(string,int,etc)
            foreach (var prop in props)
            {
                tabla.Columns.Add(prop.Name, prop.PropertyType);
            }

            var values = new object[props.Length];
            //Recorre la consulta y asigna sus valores alas columnas 
            foreach (var item in query)
            {

                for (var i = 0; i < props.Length; i++)
                {
                    values[i] = props[i].GetValue(item, null);
                }
                tabla.Rows.Add(values);

            }
            using (var inst = new XLWorkbook())
            {
                tabla.TableName = "VISITA";
                var hoja = inst.Worksheets.Add(tabla);
                hoja.ColumnsUsed().AdjustToContents();
                using (var memoria = new MemoryStream())
                {
                    inst.SaveAs(memoria);
                    var nombreExcel = string.Concat("Reporte Institucion", DateTime.Now.ToString(), ".xlsx");
                    return File(memoria.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", nombreExcel);
                }
            }
        }

    }
}
