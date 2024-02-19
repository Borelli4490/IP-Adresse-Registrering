using IPRegistreringAPI.EntityFrameworkCore;
using IPRegistreringAPI.EntityFrameworkCore.Models;

var builder = WebApplication.CreateBuilder(args);

// Disable cors for development
#if DEBUG
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
               builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
#endif

var app = builder.Build();

var dbContext = new AppDbContext();

app.MapPost("/ipaddresses", async (IPAddress ip) =>
{
    // IP-addresses are unique, so we need to check if the IP-address already exists
    var existingIp = dbContext.IPAddresses.FirstOrDefault(i => i.Ip == ip.Ip);
    if (existingIp != null)
    {
        return Results.Conflict("IP-address already exists");
    }

    dbContext.IPAddresses.Add(ip);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/ipaddresses/{ip.Id}", ip);
});

app.MapGet("/ipaddresses", () =>
{
    return dbContext.IPAddresses.ToList();
});

app.MapDelete("/ipaddresses/{id}", async (int id) =>
{
    var ip = await dbContext.IPAddresses.FindAsync(id);
    if (ip == null)
    {
        return Results.NotFound();
    }

    dbContext.IPAddresses.Remove(ip);
    await dbContext.SaveChangesAsync();

    return Results.NoContent();
});

app.UseCors();

app.Run();