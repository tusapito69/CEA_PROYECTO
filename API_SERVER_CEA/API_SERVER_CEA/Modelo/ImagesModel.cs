using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class ImagesModel
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string ruta { get; set; }

        public string estado { get; set; }

        public int? idActivity { get; set; }
        public ActivityModel? Activity { get; set; }

    }
}
