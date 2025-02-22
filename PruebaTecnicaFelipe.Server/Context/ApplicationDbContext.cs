using Microsoft.EntityFrameworkCore;
using PruebaTecnicaFelipe.Server.Models;

namespace PruebaTecnicaFelipe.Server.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Define tus DbSet aquí
    public DbSet<UserModel> Usuarios { get; set; }
}