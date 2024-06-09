using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;
using System.ComponentModel;
using System.Reflection;

namespace MasterCatalog.Items.Api.Utilities
{
    public class FileManager : IFileManager
    {
        private readonly string _connection;

        public FileManager(IOptions<FileManagerOptions> config)
        {
            _connection = config.Value.ConnectionString;
        }

        public FileModel UploadFile(FileToUpload model)
        {
            var container = GetOrCreateContainer(model.Container);
            var blobClient = container.GetBlobClient(model.FileData.FileName);
            if (blobClient.Exists())
            {
                blobClient.Delete();
            }

            blobClient.Upload(model.FileData.OpenReadStream());
            blobClient.SetHttpHeaders(new BlobHttpHeaders()
            {
                ContentType = model.FileData.ContentType
            });

            return new FileModel()
            {
                Name = blobClient.Name,
                Url = blobClient.Uri.AbsoluteUri
            };
        }

        public void DeleteFile(string fileName, string containerName)
        {
            var container = GetOrCreateContainer(containerName);
            var file = fileName.Substring(fileName.LastIndexOf('/') + 1);

            var blobClient = container.GetBlobClient(file);
            if (blobClient.Exists())
            {
                blobClient.Delete();
            }
        }

        public FileModel UpdateFileMetaData(FileModel model)
        {
            var containerClient = new BlobContainerClient(_connection, model.Container);
            if (!containerClient.Exists())
            {
                return model;
            }

            var blobClient = containerClient.GetBlobClient(model.Name);
            if (!blobClient.Exists())
            {
                return model;
            }

            blobClient.SetMetadata(model.MetaData);
            model.LastUpdated = blobClient.GetProperties().Value.LastModified.DateTime;
            return model;
        }

        public FileList ListFiles(string container)
        {
            var model = new FileList()
            {
                Container = container,
                Files = new List<FileModel>()
            };

            var containerClient = new BlobContainerClient(_connection, container);
            if (!containerClient.Exists())
            {
                return model;
            }

            var blobs = containerClient.GetBlobs(BlobTraits.All, BlobStates.None);
            foreach (var blob in blobs)
            {
                var blobClient = containerClient.GetBlobClient(blob.Name);
                model.Files.Add(new FileModel()
                {
                    MetaData = blob.Metadata,
                    Name = blob.Name,
                    Url = blobClient.Uri.AbsoluteUri,
                    LastUpdated = blobClient.GetProperties().Value.LastModified.DateTime
                });
            }

            return model;
        }

        private BlobContainerClient GetOrCreateContainer(string containerName)
        {
            var storageClient = new BlobServiceClient(_connection);
            var containerClient = storageClient.GetBlobContainerClient(containerName);
            containerClient.CreateIfNotExists(PublicAccessType.BlobContainer);
            return containerClient;
        }
    }
}
