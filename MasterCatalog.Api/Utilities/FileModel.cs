namespace MasterCatalog.Items.Api.Utilities
{
    public class FileModel
    {
        public string Container { set; get; }

        public string Name { get; set; }

        public IDictionary<string, string> MetaData { get; set; }

        public string Url { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
