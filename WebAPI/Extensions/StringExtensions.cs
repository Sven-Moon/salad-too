namespace WebAPI.Extensions
{
  // extension class is always static b/c it
  // shouldn't be able to be instantiated
  public static class StringExtensions
  {
    // the first parameter fo the first method should
    // always be the TYPE to which the extension
    // is applied... preceded by "this"
    public static bool IsEmpty(this string s)
    {
      return string.IsNullOrEmpty(s.Trim());
    }
  }
}
