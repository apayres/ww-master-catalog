using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal class ApplicationUserRepository : BaseRepository<ApplicationUserDTO>, IApplicationUserRepository
    {
        private readonly IMapper _mapper;

        public ApplicationUserRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        ApplicationUser IApplicationUserRepository.Get(string userName, string password)
        {
            var entity = base.GetAll(x => x.UserName == userName && x.Password == password).FirstOrDefault();
            return _mapper.Map<ApplicationUser>(entity);
        }
    }
}
