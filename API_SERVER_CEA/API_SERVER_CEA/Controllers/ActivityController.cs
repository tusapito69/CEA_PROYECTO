using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;
using System.ComponentModel;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ActivityController : Controller
    {
   
        private readonly ApplicationContext contexto;

        public ActivityController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<ActivityModel>>> AgregarActividad(ActivityModel activity)
        {
            ActivityModel inst = await contexto.Activity.FirstOrDefaultAsync(x => x.nombre == activity.nombre);
            if (inst != null)
            {
                return BadRequest("Esta Actividad ya existe");
            }
            else
            {
                contexto.Activity.Add(activity);
                await contexto.SaveChangesAsync();
                return Ok();

            }
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityModel>>> ObtenerActividades()
        {

            return await contexto.Activity.ToListAsync();
        }

        //GET: activos
        [HttpGet("obtenerActivos")]
        public async Task<ActionResult<List<ActivityModel>>> ObtenerActividadesActivos()
        {
            var datos = from ins in this.contexto.Activity where ins.estado == 1 select ins;

            return await datos.ToListAsync();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<ActivityModel>>> EditarActividades(int id, ActivityModel activity)
        {
            ActivityModel ins = await contexto.Activity.FirstOrDefaultAsync(x => x.Id == id);
            ImagesModel existen = await contexto.Images.FirstOrDefaultAsync(x => x.Id == activity.Id);
            if (ins == null)
            {
                return BadRequest("No se encontro la actividad");
            }
            else
            {
                ins.nombre = activity.nombre;
                ins.descripcion = activity.descripcion;
                ins.lugar = activity.lugar;
                ins.fecha = activity.fecha;
                ins.estado = activity.estado;
                ins.Imagenes = activity.Imagenes;
                await contexto.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<List<ActivityModel>>> ObtenerActividad(int id)
        {
            var institucion = await contexto.Activity.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(institucion);
        }


        [HttpGet("total")]
        public async Task<ActionResult<List<ActivityModel>>> totalActividades()
        {
            var n = await contexto.Activity.CountAsync(i => i.estado == 1);
            return Ok(n);

        }
    }
}
