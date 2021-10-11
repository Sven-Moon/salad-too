using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;        // Task
using System;                        // Exception
using Microsoft.Extensions.Logging;  // ILogger
using Microsoft.Extensions.Hosting;  // IHostEnvironment
using WebAPI.Errors;                 // ApiErrors
using System.Net;                    // HttpStatusCode

namespace WebAPI.Middlewares
{
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate next;
    private readonly ILogger logger;
    private readonly IHostEnvironment env;    // env var
    public ExceptionMiddleware(
      RequestDelegate next,
      ILogger<ExceptionMiddleware> logger,
      IHostEnvironment env    // to display error details based on prod/not-prod
    )
    {
      this.next = next;
      this.logger = logger;
      this.env = env;         // constr env
    }

    public async Task Invoke(HttpContext context)
    {
      try
      {
        await next(context);
      }
      catch (Exception ex)
      {
        ApiError response;    // define response as code/msg/details format
        HttpStatusCode statusCode
          = HttpStatusCode.InternalServerError;   // value for status code
        String message;                     // for custom messages per type
        var exceptionType = ex.GetType();   // for custom messages per type

        // CUSTOM MESSAGES PER ERROR TYPE
        if (exceptionType == typeof(UnauthorizedAccessException))
        {
          statusCode = HttpStatusCode.Forbidden;
          message = "You are not authorized";
        }
        else
        {
          statusCode = HttpStatusCode.InternalServerError;
          message = "Some unknown error occurred.";
        }

        // RESPOND WITH SIMPLER OUTPUT FOR PRODUCTION
        if (env.IsDevelopment())       // distinguish btwn prod/dev
        {
          response = new ApiError(
            (int)statusCode,
            ex.Message,
            ex.StackTrace.ToString()
          );
        }
        else                        // not dev (prod)
        {
          response = new ApiError(
            (int)statusCode,
            message                 // note use of message instead of ex.message
                                    // no stacktrace for prod
          );
        }
        logger.LogError(ex, ex.Message);
        context.Response.StatusCode = (int)statusCode;    // not hardcoded (500)
        context.Response.ContentType = "application/json";  // appears as JSON
        await context.Response
          .WriteAsync(response.ToString());               // instead of ex.Message
      }
    }
  }
}
