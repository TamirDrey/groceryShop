using server.services;

var builder = WebApplication.CreateBuilder(args);

//Services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var connectionString = builder.Configuration["DatabaseSettings:ConnectionString"];
var databaseName = builder.Configuration["DatabaseSettings:DatabaseName"];

//Connecting to a database with the connection string
builder.Services.AddSingleton(sp =>
{
    return new dbService(connectionString, databaseName);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost5173");
app.MapControllers();

app.Run();

