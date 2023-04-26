﻿using System.ComponentModel.DataAnnotations;

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

        public string? ciPersona { get; set; }

        public string? celularPersona { get; set; }
        
        public byte estadoPersona { get; set; }
    }
}
