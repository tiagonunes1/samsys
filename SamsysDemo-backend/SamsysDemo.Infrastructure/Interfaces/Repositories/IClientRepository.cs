﻿using SamsysDemo.Infrastructure.Entities;
using SamsysDemo.Infrastructure.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SamsysDemo.Infrastructure.Models.Client;

namespace SamsysDemo.Infrastructure.Interfaces.Repositories
{
    public interface IClientRepository
    {
        Task<Client?> GetById(object id, string[]? includedProperties = null);
        Task Insert(Client entityToInsert);
        void Update(Client entityToUpdate, string concurrencyToken);
        Task Delete(object id, string userDelete, string concurrencyToken);
        Task<bool> CheckDuplicate(string name, string phoneNumber);
        Task<List<ClientDTO>> GetAll();

    }
}
