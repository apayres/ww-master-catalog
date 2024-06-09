using Microsoft.Extensions.Options;

namespace MasterCatalog.Dal.Configuration
{
    public class DalOptions : IOptions<DalOptions>
    {
        public string ConnectionString { get; set; }

        public int? CommandTimeout { get; set; }

        public DalOptions Value => this;
    }
}
