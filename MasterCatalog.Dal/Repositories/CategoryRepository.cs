using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal class CategoryRepository : BaseRepository<CategoryDTO>, ICategoryRepository
    {
        private readonly IMapper _mapper;

        public CategoryRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void ICategoryRepository.Delete(int id)
        {
            base.Delete(new CategoryDTO() { CategoryID = id });
        }

        void ICategoryRepository.DeleteByParentCategory(int id)
        {
            base.DeleteMany(x => x.ParentCategoryID == id);
        }

        Category ICategoryRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<Category>(entity);
        }

        List<Category> ICategoryRepository.GetAll()
        {
            var entities = base.GetAll();
            return _mapper.Map<List<Category>>(entities);
        }

        List<Category> ICategoryRepository.GetSubCategories(int id)
        {
            var entities = base.GetAll(x => x.ParentCategoryID == id);
            return _mapper.Map<List<Category>>(entities);
        }

        int ICategoryRepository.Insert(Category model)
        {
            var entity = _mapper.Map<CategoryDTO>(model);
            model.CategoryID = base.Insert(entity);
            return model.CategoryID.Value;
        }

        void ICategoryRepository.Update(Category model)
        {
            var entity = _mapper.Map<CategoryDTO>(model);
            base.Update(entity);
        }
    }
}
