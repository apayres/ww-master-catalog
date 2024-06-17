using MasterCatalog.Dal.Configuration;
using MasterCatalog.Dal.Contracts;
using MasterCatalog.Dal.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MasterCatalog.Dal
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAbstractions(this IServiceCollection services, Action<DalOptions> options)
        {
            services.AddAutoMapper(typeof(DalMapperProfile));
            services.Configure<DalOptions>(options);
            services.AddSingleton<IApplicationUserRepository, ApplicationUserRepository>();
            services.AddSingleton<ICategoryRepository, CategoryRepository>();
            services.AddSingleton<ICompanyRepository, CompanyRepository>();
            services.AddSingleton<ICompanyCatalogRepository, CompanyCatalogRepository>();
            services.AddSingleton<IIngredientRepository, IngredientRepository>();
            services.AddSingleton<IItemAttributeRepository, ItemAttributeRepository>();
            services.AddSingleton<IItemAttributeOptionRepository, ItemAttributeOptionRepository>();
            services.AddSingleton<IItemAttributeValueRepository, ItemAttributeValueRepository>();
            services.AddSingleton<IItemRepository, ItemRepository>();
            services.AddSingleton<IUnitOfMeasureRepository, UnitOfMeasureRepository>();
            services.AddSingleton<IItemImageRepository, ItemImageRepository>();
            return services;
        }
    }
}
