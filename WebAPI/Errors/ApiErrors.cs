using System.Text.Json;

namespace WebAPI.Errors
{
  public class ApiError
  {
    public ApiError() {  } // allows instantiation w/o argument
    public ApiError(int errorCode, string errorMessage, string errorDetails = null)
    {
      ErrorCode = errorCode;
      ErrorMessage = errorMessage;
      ErrorDetails = errorDetails;
    }

    public int ErrorCode { get; set; }
    public string ErrorMessage { get; set; }
    public string ErrorDetails { get; set; }

    // send the error as a JON object
    public override string ToString()
    {
      // sets the properties in camel case ... allows use of
      // standard notation for both api & client-side consumption
      var options = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };
      return JsonSerializer.Serialize(this, options);
    }
  }
}
