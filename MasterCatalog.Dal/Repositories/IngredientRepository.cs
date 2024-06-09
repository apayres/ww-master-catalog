using AutoMapper;
using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Models;
using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Repositories
{
    internal sealed class IngredientRepository : BaseRepository<IngredientDTO>, IIngredientRepository
    {
        private readonly IMapper _mapper;

        public IngredientRepository(IOptions<DalOptions> options, IMapper mapper) : base(options)
        {
            _mapper = mapper;
        }

        void IIngredientRepository.Delete(int id)
        {
            base.Delete(new IngredientDTO { IngredientID = id });
        }

        void IIngredientRepository.DeleteByRecipeItemID(int id)
        {
            base.DeleteMany(x => x.RecipeItemID == id);
        }

        Ingredient IIngredientRepository.Get(int id)
        {
            var entity = base.Get(id);
            return _mapper.Map<Ingredient>(entity);
        }

        List<Ingredient> IIngredientRepository.GetByItemID(int id)
        {
            var entities = base.GetAll(x => x.RecipeItemID == id);
            return _mapper.Map<List<Ingredient>>(entities);
        }

        int IIngredientRepository.Insert(Ingredient model)
        {
            var entity = _mapper.Map<IngredientDTO>(model);
            model.IngredientID = base.Insert(entity);
            return model.IngredientID.Value;
        }

        void IIngredientRepository.Update(Ingredient model)
        {
            var entity = _mapper.Map<IngredientDTO>(model);
            base.Update(entity);
        }
    }
}
