using Npgsql;
using System.Data;

public class DatabaseService
{
    private readonly string _connectionString;

    public DatabaseService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DBPruebaTecnica");
    }

    // Método para ejecutar consultas que no devuelven resultados (INSERT, UPDATE, DELETE)
    public async Task ExecuteNonQueryAsync(string query, params NpgsqlParameter[] parameters)
    {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand(query, connection);
        command.Parameters.AddRange(parameters);

        await command.ExecuteNonQueryAsync();
    }

    // Método para ejecutar consultas que devuelven resultados (SELECT)
    public async Task<DataTable> ExecuteQueryAsync(string query, params NpgsqlParameter[] parameters)
    {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand(query, connection);
        command.Parameters.AddRange(parameters);

        var dataTable = new DataTable();
        var dataAdapter = new NpgsqlDataAdapter(command);
        dataAdapter.Fill(dataTable);

        return dataTable;
    }
}