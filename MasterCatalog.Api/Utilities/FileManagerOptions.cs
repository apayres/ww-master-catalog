using Microsoft.Extensions.Options;

namespace MasterCatalog.Items.Api.Utilities
{
    public class FileManagerOptions : IOptions<FileManagerOptions>
    {
        public string ConnectionString { get; set; }

        public FileManagerOptions Value => this;
    }
}