using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class CompanyCatalogRepository : BaseRepository<CompanyCatalogDTO>, ICompanyCatalogRepository
    {
        private readonly IMapper _mapper;

        public CompanyCatalogRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void ICompanyCatalogRepository.Delete(int id)
        {
            base.Delete(new CompanyCatalogDTO() { CompanyCatalogID = id });
        }

        CompanyCatalog ICompanyCatalogRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<CompanyCatalog>(entity);
        }

        List<CompanyCatalog> ICompanyCatalogRepository.GetByCompanyID(int companyID)
        {
            var entities = base.GetAll(x => x.CompanyID == companyID);
            return _mapper.Map<List<CompanyCatalog>>(entities);
        }

        List<CompanyCatalog> ICompanyCatalogRepository.GetByItemID(int itemID)
        {
            var entities = base.GetAll(x => x.ItemID == itemID);
            return _mapper.Map<List<CompanyCatalog>>(entities);
        }

        CompanyCatalog ICompanyCatalogRepository.GetByCompanyIDAndItemID(int companyID, int itemID)
        {
            var entities = base.GetAll(x => x.CompanyID == companyID && x.ItemID == itemID);
            return _mapper.Map<CompanyCatalog>(entities.FirstOrDefault());
        }

        int ICompanyCatalogRepository.Insert(CompanyCatalog model)
        {
            var entity = _mapper.Map<CompanyCatalogDTO>(model);
            model.CompanyCatalogID = base.Insert(entity);
            return model.CompanyCatalogID.Value;
        }

        void ICompanyCatalogRepository.Update(CompanyCatalog model)
        {
            var entity = _mapper.Map<CompanyCatalogDTO>(model);
            base.Update(entity);
        }

        void ICompanyCatalogRepository.DeleteByItemID(int id)
        {
            base.DeleteMany(x => x.ItemID == id);   
        }

        void ICompanyCatalogRepository.DeleteByCompanyID(int id)
        {
            base.DeleteMany(x => x.CompanyID == id);
        }
    }
}
