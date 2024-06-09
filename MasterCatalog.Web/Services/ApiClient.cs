
using System.Net.Http.Headers;

namespace MasterCatalog.Web.Services
{
    public abstract class ApiClient<T> where T : class
    {
        private readonly HttpClient _httpClient;
        
        public ApiClient(IConfiguration configuration) 
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "Master Catalog Web ApiClient");            
            _httpClient.BaseAddress = new Uri(configuration["ApiEndPointUrl"]);
        }

        public T? Post(string url, object data)
        {
            return Task.Run(() => PostAsync(url, data)).GetAwaiter().GetResult();
        }

        public async Task<T?> PostAsync(string url, object data)
        {
            var content = ObjectToFormData(data);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            using HttpResponseMessage response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var responseText = await response.Content.ReadAsStringAsync();
            if (string.IsNullOrWhiteSpace(responseText))
            {
                return null;
            }

            return await response?.Content?.ReadFromJsonAsync<T>();
        }

        private static FormUrlEncodedContent ObjectToFormData(object obj)
        {
            var keyValuePairs = new List<KeyValuePair<string, string>>();
            var properties = obj.GetType().GetProperties();

            foreach (var property in properties)
            {
                keyValuePairs.Add(new KeyValuePair<string, string>(property.Name, property.GetValue(obj)?.ToString()));
            }

            return new FormUrlEncodedContent(keyValuePairs);
        }
    }
}
