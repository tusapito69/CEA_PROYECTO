using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string? nombreRol{ get; set; }

        public byte estadoRol { get; set; }

    }
}
