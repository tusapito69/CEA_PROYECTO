using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class Persona
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string? nombrePersona { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string? apellidoPersona { get; set; }

        public int? edadPersona { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public int ciPersona { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public int celularPersona { get; set; }
        
        public byte estadoPersona { get; set; }
    }
}
