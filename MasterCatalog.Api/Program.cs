using MasterCatalog.Api.Extensions;
using MasterCatalog.Dal;
using MasterCatalog.Items.Api.Utilities;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<FileManagerOptions>(x =>
{
    x.ConnectionString = builder.Configuration.GetConnectionString("BlobStorage");
});

var allowedOrigins = builder.Configuration.GetValue("CORSAllowedOrigins", string.Empty);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins(allowedOrigins.Split(';'));
            policy.AllowAnyMethod();
            policy.WithHeaders(HeaderNames.ContentType);
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAppServices();
builder.Services.AddDataAbstractions(o =>
{
    o.ConnectionString = builder.Configuration.GetConnectionString("Default");
    o.CommandTimeout = 120;
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
