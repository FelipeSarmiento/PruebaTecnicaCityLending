using Microsoft.EntityFrameworkCore;
using PruebaTecnicaFelipe.Server.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton(new EncryptionService("abcdefghijklmnopqrstuvwxyz123456", "1234567890123456"));
builder.Services.AddScoped<CompanyLocationService>();
builder.Services.AddScoped<ScheduleService>();
builder.Services.AddTransient<EmailService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
