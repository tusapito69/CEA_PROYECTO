using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
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


        public async Task<ActionResult<List<Institucion>>> ObtenerInstituciones() {

            return await contexto.Institucion.ToListAsync();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Institucion>>> EditarInstituciones(int id, Institucion institution)
        {
            Institucion ins = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
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
        //[HttpDelete("{id:int}")]
        //public async Task<ActionResult> Eliminar(int id)
        //{
        //    Institucion existe = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
        //    if (existe != null)
        //    {
        //        contexto.Remove(existe);
        //        await contexto.SaveChangesAsync();
        //        return Ok();
        //    }
        //    else { return BadRequest("El acta de congreso a eliminar no existe"); }
        //}

        [HttpGet("{id:int}")]

        public async Task<ActionResult<List<Institucion>>> ObtenerInstitucion(int id)
        {

            var institucion = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(institucion);
        }
        [HttpPost("{id:int}")]
        public IActionResult Exportar_Excel(int id )
        {

            var query= from i in contexto.Institucion where i.Estado==id select i;
            //Crea un tabla a partir del modelo intitucion
            DataTable? tabla = new DataTable(typeof(Institucion).Name);
         
            //Toma las propiedades de Institucion y las asigna a la variable props
            PropertyInfo[] props = typeof(Institucion).GetProperties(BindingFlags.Public | BindingFlags.Instance);

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
            using (var inst=new XLWorkbook())
            {
                tabla.TableName = "INSTITUCION";
                var hoja = inst.Worksheets.Add(tabla);
                hoja.ColumnsUsed().AdjustToContents();
                using(var memoria=new MemoryStream())
                {
                    inst.SaveAs(memoria);
                    var nombreExcel = string.Concat("Reporte Institucion",DateTime.Now.ToString(),".xlsx");
                    return File(memoria.ToArray(),"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",nombreExcel);
                }
            }
        }
    }
}
