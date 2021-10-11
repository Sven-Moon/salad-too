using Microsoft.AspNetCore.Builder;   // IApplicationBuilder
using Microsoft.AspNetCore.Hosting;   // IWebHostEnvironment
using Microsoft.Extensions.Hosting;   // IWebHostEnvironment
using System.Net;    // HttpStatusCode
using Microsoft.AspNetCore.Diagnostics; // .Get<IExceptionHandlerFeature>
using Microsoft.AspNetCore.Http;  // .WriteAsync
using WebAPI.Middlewares;

namespace WebAPI.Extensions
{
  public static class ExceptionMiddlewareExtensions
  {

    public static void ConfigureExceptionHandler(     // calls the ExceptionMiddleware
      this IApplicationBuilder app,
      IWebHostEnvironment env
    )
    {
      app.UseMiddleware<ExceptionMiddleware>();
    }

    public static void ConfigureBuiltInExceptionHandler(
      this IApplicationBuilder app,
      IWebHostEnvironment env
    )
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else    // not development
      {
        app.UseExceptionHandler(    // error -> response
          options =>
          {      // option is provided by ex-handler
            options.Run(      // option adds MW delegate to...
                              // pipeline w/ Run() method
              async context =>
              {   // HttpContext
                context.Response.StatusCode = // set status code...
                  (int)HttpStatusCode.InternalServerError; // to 500
                var ex = context.Features     // get the exception
                  .Get<IExceptionHandlerFeature>();
                if (ex != null)   // if it's not null...
                {                 // return the error message
                  await context.Response.WriteAsync(ex.Error.Message);
                }
              }
            );
          }
        );
      }
    }
  }
}

