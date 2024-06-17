using AutoMapper;
using MasterCatalog.Dal.DataTransferObjects;
using MasterCatalog.Domain.Enums;
using MasterCatalog.Domain.Models;

namespace MasterCatalog.Dal.Configuration
{
    public class DalMapperProfile : Profile
    {
        public DalMapperProfile()
        {
            CreateMap<ApplicationUserDTO, ApplicationUser>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (ApplicationRole)src.ApplicationRoleID));

            CreateMap<ApplicationUser, ApplicationUserDTO>()
                .ForMember(dest => dest.ApplicationRoleID, opt => opt.MapFrom(src => (int)src.Role));

            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CompanyDTO, Company>().ReverseMap();
            CreateMap<CompanyCatalogDTO, CompanyCatalog>().ReverseMap();
            CreateMap<IngredientDTO, Ingredient>().ReverseMap();
            CreateMap<ItemDTO, Item>().ReverseMap();

            CreateMap<ItemAttributeDTO, ItemAttribute>()
                .ForMember(dest => dest.AttributeDataTypeID, opt => opt.MapFrom(src => src.ItemAttributeDataTypeID));


            CreateMap<ItemAttribute, ItemAttributeDTO>()
                .ForMember(dest => dest.ItemAttributeDataTypeID, opt => opt.MapFrom(src => src.AttributeDataTypeID));

            CreateMap<ItemAttributeOptionDTO, ItemAttributeOption>().ReverseMap();
            CreateMap<ItemAttributeValueDTO, ItemAttributeValue>().ReverseMap();
            CreateMap<UnitOfMeasureDTO, UnitOfMeasure>().ReverseMap();
            CreateMap<ItemImageDTO, ItemImage>().ReverseMap();
        }
    }
}
