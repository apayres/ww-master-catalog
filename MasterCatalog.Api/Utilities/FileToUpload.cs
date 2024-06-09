namespace MasterCatalog.Items.Api.Utilities
{
    public class FileToUpload
    {
        public string Container { set; get; }

        public IFormFile FileData { set; get; }
    }
}
