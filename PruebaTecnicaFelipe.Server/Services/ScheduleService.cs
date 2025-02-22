using Npgsql;
using System.Data;
using Microsoft.VisualBasic.CompilerServices;
using PruebaTecnicaFelipe.Server.Models;

public class ScheduleService
{
    private readonly string _connectionString;
    private EncryptionService _encryptionService;

    public ScheduleService(IConfiguration configuration, EncryptionService encryptionService)
    {
        _connectionString = configuration.GetConnectionString("DBPruebaTecnica");
        _encryptionService = encryptionService;
    }
    
    
    public async Task<Tuple<bool, string>> DeleteUser(int idUser)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"DELETE FROM users WHERE iduser = @idUser";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@idUser", idUser);
                    await command.ExecuteNonQueryAsync();

                    result = true;
                }

                return new Tuple<bool, string>(result, "User deleted");
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(result, e.Message);
        }
    }
    
    public async Task<Tuple<bool, string>> UpdateSchedule(ScheduleModel scheduleModel)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"UPDATE schedule 
                        SET 
                            iduser = @idUser,
                            idcompanylocation = @idCompanyLocation,
                            initialtime = @initialTime,
                            finaltime = @finalTime,
                        WHERE iduser = @iduser AND idcompanylocation = @idcompanylocation;";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@idUser", scheduleModel.IdUser );
                    command.Parameters.AddWithValue("@idCompanyLocation", scheduleModel.IdCompanyLocation);
                    command.Parameters.AddWithValue("@initialTime", scheduleModel.InitialTime);
                    command.Parameters.AddWithValue("@finalTime", scheduleModel.FinalTime);
                    
                    await command.ExecuteNonQueryAsync();

                    result = true;
                }

                return new Tuple<bool, string>(result, "Schedule updated");
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(false, e.Message);
        }
    }

    public async Task<Tuple<bool, string>> AddSchedule(ScheduleModel scheduleModel)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                INSERT INTO schedule (idcompanylocation, iduser, initialTime, finalTime) VALUES (@idcompanylocation, @iduser, @initialTime, @finalTime)";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idcompanylocation", scheduleModel.IdCompanyLocation);
                    command.Parameters.AddWithValue("@iduser", scheduleModel.IdUser);
                    command.Parameters.AddWithValue("@initialTime", scheduleModel.InitialTime);
                    command.Parameters.AddWithValue("@finalTime", scheduleModel.FinalTime);
                    
                    await command.ExecuteNonQueryAsync();

                    return new Tuple<bool, string>(true, "Schedule added");

                }
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(false, e.Message);
        }
    }

    public async Task<Tuple<bool, string, List<ScheduleModel>>> GetAllSchedules()
    {
        var schedules = new List<ScheduleModel>();
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = "SELECT * FROM Users";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            schedules.Add(new ScheduleModel()
                            {
                                IdUser = reader.GetInt32("iduser"),
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                InitialTime = reader.GetString("initialTime"),
                                FinalTime = reader.GetString("finalTime"),
                            });
                        }
                        return new Tuple<bool, string, List<ScheduleModel>>(true, "Schedules retrieved successfully", schedules);
                    }
                }
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, List<ScheduleModel>>(false, e.Message, schedules);
        }
    }
    
}