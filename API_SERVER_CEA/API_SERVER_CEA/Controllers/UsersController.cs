using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using System.Security.Cryptography;
using System.IO;
using System.Text;


namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext contexto;

        public UsersController(ApplicationContext context)
        {
            this.contexto = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<List<DataUser>>> ObtenerUsuarios()
        {
            var datos = from us in this.contexto.Usuario
                        join r in this.contexto.Rol on us.RolId equals r.Id
                        join p in this.contexto.Persona on us.PersonaId equals p.Id
                        select new DataUser{ 
                            idUsuario= us.idUsuario, 
                            nombreUsuario=us.nombreUsuario,
                            nombreRol=r.nombreRol,
                            nombrePersona = p.nombrePersona, 
                            apellidoPersona= p.apellidoPersona, 
                            estadoUsuario=us.estadoUsuario
                        };
            return await datos.ToListAsync();
        }

        //GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //    var user = await _context.Usuario.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

       
        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> EditarUsuario(int id, User user)
        {
            if (id != user.idUsuario)
            {
                return BadRequest();
            }

            contexto.Entry(user).State = EntityState.Modified;

            try
            {
                await contexto.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound("Este usuario ya existe");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AgregarUsuario(User user)
        {
            var usuario=await contexto.Usuario.FirstOrDefaultAsync(x=>x.nombreUsuario==user.nombreUsuario);
            if (usuario == null)
            {
                var i = Encriptar(user.contraseniaUsuario);
                user.contraseniaUsuario = i;
                contexto.Usuario.Add(user);
                await contexto.SaveChangesAsync();
                return Ok("Usuario agregado con exito");
           
            }
            else
            {
                return BadRequest("Este usuario ya existe");

            }
        }

        // DELETE: api/Users/5
        [HttpPut("baja/{id}")]
        public async Task<IActionResult> DesactivarUsuario(int id,User usuario)
        {
            var user = await contexto.Usuario.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.estadoUsuario = usuario.estadoUsuario;
            await contexto.SaveChangesAsync();

            return NoContent();
        }
        public static string Encriptar(string cadena)
        {
            SHA256 llave= SHA256.Create();
            ASCIIEncoding e = new ASCIIEncoding();
            byte[] s = null;
            StringBuilder stringBuilder= new StringBuilder();
            s = llave.ComputeHash(e.GetBytes(cadena));
            for (int i = 0; i < s.Length; i++) stringBuilder.AppendFormat("{0:x2}", s[i]);
            return stringBuilder.ToString();
        }

        private bool UserExists(int id)
        {
            return contexto.Usuario.Any(e => e.idUsuario == id);
        }
    }
}

