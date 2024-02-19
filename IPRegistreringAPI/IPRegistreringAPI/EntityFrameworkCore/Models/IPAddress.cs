using System.ComponentModel.DataAnnotations;

namespace IPRegistreringAPI.EntityFrameworkCore.Models
{
    public class IPAddress
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Ip { get; set; }
        public string? Description { get; set; }
        public string? Creator { get; set; }
        public DateTime CreationTime { get; set; } = DateTime.UtcNow;
    }
}
