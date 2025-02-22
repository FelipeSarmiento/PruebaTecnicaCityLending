using Npgsql;
using System.Data;
using Microsoft.VisualBasic.CompilerServices;
using PruebaTecnicaFelipe.Server.Models;

public class CompanyLocationService
{
    private readonly string _connectionString;

    public CompanyLocationService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DBPruebaTecnica");
    }

    public async Task<Tuple<bool, string>> AddCompanyLocation(CompanyLocationModel companyLocation)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"INSERT INTO companylocations (name, address, status, access_schedule, datecreated, dateupdated) VALUES (@name, @address, @status, @access_schedule, @datecreated, @dateupdated)";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@name", companyLocation.Name);
                    command.Parameters.AddWithValue("@address", companyLocation.Address);
                    command.Parameters.AddWithValue("@status", companyLocation.Status);
                    command.Parameters.AddWithValue("@access_schedule", companyLocation.AccessSchedule);
                    command.Parameters.AddWithValue("@datecreated", DateTime.Now.ToString());
                    command.Parameters.AddWithValue("@dateupdated", DateTime.Now.ToString());
                    await command.ExecuteNonQueryAsync();
                    result = true;
                }
            }

            return new Tuple<bool, string>(result, "Company location added");
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(result, e.Message);
        }
    }

    public async Task<Tuple<bool, string>> UpdateCompanyLocation(CompanyLocationModel companyLocation)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"UPDATE companylocations 
                        SET 
                            name = @name, 
                            address = @address, 
                            status = @status, 
                            access_schedule = @access_schedule, 
                            dateupdated = @dateupdated 
                        WHERE idcompanylocation = @idcompanylocation;";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@idcompanylocation", companyLocation.IdCompanyLocation);
                    command.Parameters.AddWithValue("@name", companyLocation.Name);
                    command.Parameters.AddWithValue("@address", companyLocation.Address);
                    command.Parameters.AddWithValue("@status", companyLocation.Status);
                    command.Parameters.AddWithValue("@access_schedule", companyLocation.AccessSchedule);
                    command.Parameters.AddWithValue("@dateupdated", DateTime.Now);
                    await command.ExecuteNonQueryAsync();

                    result = true;
                }

                return new Tuple<bool, string>(result, "Company location updated");
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(false, e.Message);
        }
    }

    public async Task<Tuple<bool, string>> DeleteCompanyLocation(int idCompanyLocation)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"DELETE FROM companylocations WHERE idcompanylocation = @idcompanylocation CASCADE";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@idcompanylocation", idCompanyLocation);
                    await command.ExecuteNonQueryAsync();

                    result = true;
                }

                return new Tuple<bool, string>(result, "Company location deleted");
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(result, e.Message);
        }
    }

    public async Task<Tuple<bool, string, List<CompanyLocationModel>>> GetAllCompanyLocations()
    {
        List<CompanyLocationModel> companyLocations = new List<CompanyLocationModel>();

        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = "SELECT * FROM companylocations";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            companyLocations.Add(new CompanyLocationModel()
                            {
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                Name = reader.GetString("name"),
                                Address = reader.GetString("address"),
                                Status = reader.GetBoolean("status"),
                                AccessSchedule = reader.GetBoolean("access_schedule"),
                            });
                        }
                    }
                }

                return new Tuple<bool, string, List<CompanyLocationModel>>(true, "Company locations retrieved", companyLocations);
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, List<CompanyLocationModel>>(false, e.Message, companyLocations);
        }
    }
    public async Task<Tuple<bool, string, List<CompanyLocationInnerModel>>> GetAllCompanyLocationsByUser(int idUser)
    {
        List<CompanyLocationInnerModel> companyLocations = new List<CompanyLocationInnerModel>();
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = "SELECT companyLocations.*,    schedule.initialtime as initialtime,    schedule.finaltime as finaltime FROM companylocations INNER JOIN schedule ON schedule.idCompanyLocation = Companylocations.idcompanylocation WHERE Schedule.idUser = @idUser";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idUser", idUser);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            companyLocations.Add(new CompanyLocationInnerModel()
                            {
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                Name = reader.GetString("name"),
                                Address = reader.GetString("address"),
                                InitialTime = reader.GetString("initialtime"),
                                FinalTime = reader.GetString("finaltime"),
                                Status = reader.GetBoolean("status"),
                                AccessSchedule = reader.GetBoolean("access_schedule"),
                            });
                        }
                    }
                }

                return new Tuple<bool, string, List<CompanyLocationInnerModel>>(true, "Company locations retrieved", companyLocations);
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, List<CompanyLocationInnerModel>>(false, e.Message, companyLocations);
        }
    }
    public async Task<Tuple<bool, string, List<CompanyLocationModel>>> GetAllCompanyLocationsAvailable()
    {
        List<CompanyLocationModel> companyLocations = new List<CompanyLocationModel>();

        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = "SELECT * FROM companylocations WHERE status = true AND access_schedule = true";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            companyLocations.Add(new CompanyLocationModel()
                            {
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                Name = reader.GetString("name"),
                                Address = reader.GetString("address"),
                                Status = reader.GetBoolean("status"),
                                AccessSchedule = reader.GetBoolean("access_schedule"),
                            });
                        }
                    }
                }

                return new Tuple<bool, string, List<CompanyLocationModel>>(true, "Company locations retrieved", companyLocations);
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, List<CompanyLocationModel>>(false, e.Message, companyLocations);
        }
    }

    public async Task<Tuple<bool, string, Tuple<List<CompanyLocationModel>, int>>> GetCompanyLocationsPaged(int pageNumber, int pageSize)
    {
        var companyLocation = new List<CompanyLocationModel>();
        int totalCount = 0;

        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Consulta para obtener los usuarios paginados
                var query = @"
            SELECT * FROM companylocations
            ORDER BY idcompanylocation ASC
            LIMIT @PageSize OFFSET @Offset";

                // Consulta para obtener el total de usuarios
                var countQuery = "SELECT COUNT(*) FROM companylocations";

                // Ejecutar la consulta de conteo
                using (var countCommand = new NpgsqlCommand(countQuery, connection))
                {
                    totalCount = Convert.ToInt32(await countCommand.ExecuteScalarAsync());
                }

                // Calcular el offset basado en el número de página y el tamaño de la página
                int offset = (pageNumber - 1) * pageSize;

                // Ejecutar la consulta paginada
                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@PageSize", pageSize);
                    command.Parameters.AddWithValue("@Offset", offset);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            companyLocation.Add(new CompanyLocationModel()
                            {
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                Name = reader.GetString("name"),
                                Address = reader.GetString("address"),
                                Status = reader.GetBoolean("status"),
                                AccessSchedule = reader.GetBoolean("access_schedule"),
                            });
                        }
                    }
                }

                return new Tuple<bool, string, Tuple<List<CompanyLocationModel>, int>>(true, "Company locations retrieved", new Tuple<List<CompanyLocationModel>, int>(companyLocation, totalCount));
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, Tuple<List<CompanyLocationModel>, int>>(true, "Company locations retrieved", new Tuple<List<CompanyLocationModel>, int>(companyLocation, totalCount));
        }
    }
    public async Task<Tuple<bool, string, Tuple<List<CompanyLocationInnerModel>, int>>> GetCompanyLocationsPagedByUser(int pageNumber, int pageSize, int idUser)
    {
        var companyLocation = new List<CompanyLocationInnerModel>();
        int totalCount = 0;

        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Consulta para obtener los usuarios paginados
                var query = @"
            SELECT companyLocations.*,    schedule.initialtime as initialtime,    schedule.finaltime as finaltime FROM companylocations INNER JOIN schedule ON schedule.idCompanyLocation = Companylocations.idcompanylocation WHERE Schedule.idUser = @idUser AND companylocations.status = true AND companylocations.access_schedule = true ORDER BY idcompanylocation ASC LIMIT @PageSize OFFSET @Offset";

                // Consulta para obtener el total de usuarios
                var countQuery = @"SELECT COUNT(*) FROM companylocations INNER JOIN schedule ON schedule.idCompanyLocation = companylocations.idcompanylocation WHERE schedule.idUser = @idUser;";

                // Ejecutar la consulta de conteo
                using (var countCommand = new NpgsqlCommand(countQuery, connection))
                {
                    countCommand.Parameters.AddWithValue("@idUser", idUser);
                    totalCount = Convert.ToInt32(await countCommand.ExecuteScalarAsync());
                }

                // Calcular el offset basado en el número de página y el tamaño de la página
                int offset = (pageNumber - 1) * pageSize;

                // Ejecutar la consulta paginada
                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idUser", idUser);
                    command.Parameters.AddWithValue("@PageSize", pageSize);
                    command.Parameters.AddWithValue("@Offset", offset);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            companyLocation.Add(new CompanyLocationInnerModel()
                            {
                                IdCompanyLocation = reader.GetInt32("idcompanylocation"),
                                Name = reader.GetString("name"),
                                Address = reader.GetString("address"),
                                Status = reader.GetBoolean("status"),
                                AccessSchedule = reader.GetBoolean("access_schedule"),
                                InitialTime = reader.GetString("initialtime"),
                                FinalTime = reader.GetString("finaltime"),
                            });
                        }
                    }
                }

                return new Tuple<bool, string, Tuple<List<CompanyLocationInnerModel>, int>>(true, "Company locations retrieved", new Tuple<List<CompanyLocationInnerModel>, int>(companyLocation, totalCount));
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, Tuple<List<CompanyLocationInnerModel>, int>>(true, "Company locations retrieved", new Tuple<List<CompanyLocationInnerModel>, int>(companyLocation, totalCount));
        }
    }
}