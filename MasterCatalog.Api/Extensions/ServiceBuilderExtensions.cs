using MasterCatalog.Api.Services;
using MasterCatalog.Items.Api.Services;
using MasterCatalog.Items.Api.Utilities;

namespace MasterCatalog.Api.Extensions
{
    public static class ServiceBuilderExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {

            services.AddSingleton<ICompanyService, CompanyService>();
            services.AddSingleton<ICompanyCatalogService, CompanyCatalogService>();
            services.AddSingleton<IIngredientService, IngredientService>();
            services.AddSingleton<IItemAttributeService, ItemAttributeService>();
            services.AddSingleton<IItemImageService, ItemImageService>();
            services.AddSingleton<IItemService, ItemService>();
            services.AddSingleton<IUnitOfMeasureService, UnitOfMeasureService>();
            services.AddScoped<IFileManager, FileManager>();

            return services;
        }
    }
}
