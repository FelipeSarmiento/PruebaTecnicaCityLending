using System.Runtime.InteropServices.JavaScript;

namespace PruebaTecnicaFelipe.Server.Models;

public class UserModel
{
    public int? IdUser { get; set; }
    public string? FirstName { get; set; } = String.Empty;
    public string? LastName { get; set; } = String.Empty;
    public string? Address { get; set; } = String.Empty;
    public string? PhoneNumber { get; set; } = String.Empty;
    public string? Email { get; set; } = String.Empty;
    public string? Country { get; set; } = String.Empty;
    public string? City { get; set; } = String.Empty;
    public string? UserType { get; set; } = String.Empty;
    public string? Password { get; set; } = String.Empty;
}