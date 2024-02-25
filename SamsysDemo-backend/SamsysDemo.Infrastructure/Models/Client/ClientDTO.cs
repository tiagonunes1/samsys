using System;

namespace SamsysDemo.Infrastructure.Models.Client
{
    public class ClientDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime? DateBirth { get; set; } 

        public string ConcurrencyToken { get; set; } = string.Empty;
    }
}
