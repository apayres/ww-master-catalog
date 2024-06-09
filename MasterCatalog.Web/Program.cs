using MasterCatalog.Web.Authentication;
using MasterCatalog.Web.Services;
using Microsoft.Extensions.FileProviders;
using System.Net;
using System.Reflection.PortableExecutable;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation();

builder.Services.AddAuthentication()
    .AddScheme<MasterCatalogAuthSchemeOptions, MasterCatalogAuthSchemeHandler>(
    "MasterCatalogAuthScheme",
    opts => { });

builder.Services.AddAuthorization();
builder.Services.AddSession();
builder.Services.AddSingleton<IApplicationUserService, ApplicationUserService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error/Index");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStatusCodePages(context =>
{
    var response = context.HttpContext.Response;
    if (response.StatusCode == (int)HttpStatusCode.Unauthorized || response.StatusCode == (int)HttpStatusCode.Forbidden)
    {
        response.Redirect("/Error/NotAuthorized");
    }

    return Task.CompletedTask;
});

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine("D:/a/ww-master-catalog/ww-master-catalog/MasterCatalog.Web", "Views")),
    RequestPath = "/Views"
});

app.UseRouting();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}").RequireAuthorization();

app.Run();
