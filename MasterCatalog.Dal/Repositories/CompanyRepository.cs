using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class CompanyRepository: BaseRepository<CompanyDTO>, ICompanyRepository
    {
        private readonly IMapper _mapper;

        public CompanyRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        { 
            _mapper = mapper;
        }

        void ICompanyRepository.Delete(int id)
        {
            base.Delete(new CompanyDTO() {  CompanyID = id });
        }

        Company ICompanyRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<Company>(entity);
        }

        List<Company> ICompanyRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<Company>>(entities);
        }

        int ICompanyRepository.Insert(Company model)
        {
            var entity = _mapper.Map<CompanyDTO>(model);
            model.CompanyID = base.Insert(entity);
            return entity.CompanyID;
        }

        void ICompanyRepository.Update(Company model)
        {
            var entity = _mapper.Map<CompanyDTO>(model);
            base.Update(entity);
        }
    }
}
