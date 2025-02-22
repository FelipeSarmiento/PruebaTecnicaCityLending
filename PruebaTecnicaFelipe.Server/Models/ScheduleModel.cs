namespace PruebaTecnicaFelipe.Server.Models;

public class ScheduleModel
{
    public int? IdCompanyLocation { get; set; }
    public int? IdUser { get; set; }
    public string? InitialTime { get; set; }
    public string? FinalTime { get; set; }
}