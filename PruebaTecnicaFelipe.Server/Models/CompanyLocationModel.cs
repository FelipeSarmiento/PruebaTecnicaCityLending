namespace PruebaTecnicaFelipe.Server.Models;

public class CompanyLocationModel
{
    public int? IdCompanyLocation { get; set; }
    public string? Name { get; set; } = string.Empty;
    public string? Address { get; set; } = string.Empty;
    public bool? Status { get; set; } = true;
    public bool? AccessSchedule { get; set; } = true;
}

public class CompanyLocationInnerModel
{
    public int? IdCompanyLocation { get; set; }
    public string? Name { get; set; } = string.Empty;
    public string? Address { get; set; } = string.Empty;
    public string? InitialTime { get; set; } = string.Empty;
    public string? FinalTime { get; set; } = string.Empty;
    public bool? Status { get; set; } = true;
    public bool? AccessSchedule { get; set; } = true;
}

