using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<DataContext>(options =>
        options.UseSqlServer(
          Configuration.GetConnectionString("Default")
        )
      );
      services.AddControllers();
      services.AddCors();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
      });
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

      var secretKey = Configuration.GetSection("AppSettings:Key").Value;
      var key = new SymmetricSecurityKey(Encoding.UTF8
        .GetBytes(secretKey));
      services.AddAuthentication(JwtBearerDefaults
        .AuthenticationScheme).AddJwtBearer(opt =>
        {
          opt.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,  // will be set to true for prod
            ValidateAudience = false,  // will be set to true for prod
            IssuerSigningKey = key
          };
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      // !!! sequence for these operations is important!!!using System.Net;    // HttpStatusCode

      app.ConfigureExceptionHandler(env);

      if (env.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
      }

      app.UseRouting();

      app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

      app.UseAuthentication();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
