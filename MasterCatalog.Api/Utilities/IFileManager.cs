namespace MasterCatalog.Items.Api.Utilities
{
    public interface IFileManager
    {
        FileList ListFiles(string container);
        FileModel UploadFile(FileToUpload model);
        void DeleteFile(string fileName, string containerName);
    }
}