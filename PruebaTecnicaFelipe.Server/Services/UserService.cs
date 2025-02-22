using Npgsql;
using System.Data;
using Microsoft.VisualBasic.CompilerServices;
using PruebaTecnicaFelipe.Server.Models;

public class UserService
{
    private readonly string _connectionString;
    private EncryptionService _encryptionService;

    public UserService(IConfiguration configuration, EncryptionService encryptionService)
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
    
    public async Task<Tuple<bool, string>> UpdateUser(UserModel userModel)
    {
        bool result = false;
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"UPDATE users 
                        SET 
                            firstname = @firstName, 
                            lastname = @lastName, 
                            address = @address, 
                            phonenumber = @phonenumber, 
                            email = @email, 
                            country = @country, 
                            city = @city, 
                            usertype = @usertype,
                            dateupdated = @dateupdated
                        WHERE iduser = @iduser";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    // Asignar los valores de los parámetros
                    command.Parameters.AddWithValue("@iduser", userModel.IdUser );
                    command.Parameters.AddWithValue("@firstName", userModel.FirstName);
                    command.Parameters.AddWithValue("@lastName", userModel.LastName);
                    command.Parameters.AddWithValue("@address", userModel.Address);
                    command.Parameters.AddWithValue("@phonenumber", userModel.PhoneNumber);
                    command.Parameters.AddWithValue("@email", userModel.Email);
                    command.Parameters.AddWithValue("@country", userModel.Country);
                    command.Parameters.AddWithValue("@city", userModel.City);
                    command.Parameters.AddWithValue("@usertype", userModel.UserType);
                    command.Parameters.AddWithValue("@dateupdated", DateTime.Now.ToString());
                    await command.ExecuteNonQueryAsync();

                    result = true;
                }

                return new Tuple<bool, string>(result, "User updated");
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string>(false, e.Message);
        }
    }

    public async Task<Tuple<bool, string>> AddUser(UserModel user)
    {
        
        string encryptedPassword = _encryptionService.Encrypt(user.Password);
        
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"
                INSERT INTO users (firstname, lastname, email, address, phonenumber, country, city, usertype, password, datecreated, dateupdated)
                VALUES (@firstname, @lastname, @email, @address, @phonenumber, @country, @city, @usertype, @password, @datecreated, @dateupdated)";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@firstname", user.FirstName);
                    command.Parameters.AddWithValue("@lastname", user.LastName);
                    command.Parameters.AddWithValue("@email", user.Email);
                    command.Parameters.AddWithValue("@address", user.Address);
                    command.Parameters.AddWithValue("@phonenumber", user.PhoneNumber);
                    command.Parameters.AddWithValue("@country", user.Country);
                    command.Parameters.AddWithValue("@city", user.City);
                    command.Parameters.AddWithValue("@usertype", user.UserType);
                    command.Parameters.AddWithValue("@password", encryptedPassword);
                    command.Parameters.AddWithValue("@datecreated", new DateTime().Date);
                    command.Parameters.AddWithValue("@dateupdated", new DateTime().Date);
                    await command.ExecuteNonQueryAsync();

                    return new Tuple<bool, string>(true, "User created successfully");

                }
            }
        }
        catch (Exception e)
        {
            if (e.Message.Contains("duplica"))
            {
                return new Tuple<bool, string>(false, "Email already exists");
            }
            return new Tuple<bool, string>(false, e.Message);
        }
    }

    public async Task<Tuple<bool, string, List<UserModel>>> GetAllUsers()
    {
        var users = new List<UserModel>();
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
                            users.Add(new UserModel
                            {
                                IdUser = reader.GetInt32("iduser"),
                                FirstName = reader.GetString("firstname"),
                                LastName = reader.GetString("lastname"),
                                Email = reader.GetString("email"),
                                Address = reader.GetString("address"),
                                PhoneNumber = reader.GetString("phonenumber"),
                                UserType = reader.GetString("usertype"),
                                Country = reader.GetString("country"),
                                City = reader.GetString("city")
                            });
                        }
                        return new Tuple<bool, string, List<UserModel>>(true, "Users retrieved successfully", users);
                    }
                }
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, List<UserModel>>(false, e.Message, users);
        }
    }
    public async Task<Tuple<bool, string, UserModel>> GetUser(int idUser)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"SELECT * FROM Users WHERE iduser = @iduser";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@iduser", idUser);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        UserModel user = new UserModel()
                        {
                            IdUser = reader.GetInt32("iduser"),
                            FirstName = reader.GetString("firstname"),
                            LastName = reader.GetString("lastname"),
                            Email = reader.GetString("email"),
                            Address = reader.GetString("address"),
                            PhoneNumber = reader.GetString("phonenumber"),
                            UserType = reader.GetString("usertype"),
                            Country = reader.GetString("country"),
                            City = reader.GetString("city")
                        };
                        
                        return new Tuple<bool, string, UserModel>(true, "User retrieved successfully", user);
                    }
                }
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, UserModel>(false, e.Message, new UserModel());
        }
    }
    public async Task<Tuple<bool, string, UserModel>> GetUser(UserModel userModel)
    {
        
        string encryptedPassword = _encryptionService.Encrypt(userModel.Password);
        
        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = @"SELECT * FROM Users WHERE email = @email AND password = @password";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", userModel.Email);
                    command.Parameters.AddWithValue("@password", encryptedPassword);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            // Avanzar al primer registro
                            if (await reader.ReadAsync())
                            {
                                Console.WriteLine("User retrieved successfully");
                                UserModel user = new UserModel()
                                {
                                    IdUser = reader.GetInt32("iduser"),
                                    FirstName = reader.GetString("firstname"),
                                    LastName = reader.GetString("lastname"),
                                    Email = reader.GetString("email"),
                                    Address = reader.GetString("address"),
                                    PhoneNumber = reader.GetString("phonenumber"),
                                    UserType = reader.GetString("usertype"),
                                    Country = reader.GetString("country"),
                                    City = reader.GetString("city")
                                };

                                return new Tuple<bool, string, UserModel>(true, "User logged", user);
                            }
                        }

                        // Si no hay filas o no se pudo leer el registro
                        return new Tuple<bool, string, UserModel>(false, "Email or Password is incorrect", new UserModel()); 
                    }
                }
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, UserModel>(false, e.Message, new UserModel());
        }
    }
    public async Task<Tuple<bool, string, Tuple<List<UserModel>, int>>> GetUsersPaged(int pageNumber, int pageSize)
    {
        var companyLocation = new List<UserModel>();
        int totalCount = 0;

        try
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Consulta para obtener los usuarios paginados
                var query = @"
            SELECT * FROM users
            ORDER BY iduser
            LIMIT @PageSize OFFSET @Offset";

                // Consulta para obtener el total de usuarios
                var countQuery = "SELECT COUNT(*) FROM users";

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
                            companyLocation.Add(new UserModel()
                            {
                                IdUser = reader.GetInt32("iduser"),
                                FirstName = reader.GetString("firstname"),
                                LastName = reader.GetString("lastname"),
                                Email = reader.GetString("email"),
                                Address = reader.GetString("address"),
                                PhoneNumber = reader.GetString("phonenumber"),
                                UserType = reader.GetString("usertype"),
                                Country = reader.GetString("country"),
                                City = reader.GetString("city")
                            });
                        }
                    }
                }

                return new Tuple<bool, string, Tuple<List<UserModel>, int>>(true, "Users retrieved", new Tuple<List<UserModel>, int>(companyLocation, totalCount));
            }
        }
        catch (Exception e)
        {
            return new Tuple<bool, string, Tuple<List<UserModel>, int>>(true, "Users retrieved", new Tuple<List<UserModel>, int>(companyLocation, totalCount));
        }
    }
}