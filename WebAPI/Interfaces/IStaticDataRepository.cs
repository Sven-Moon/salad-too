using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
  public interface IStaticDataRepository
  {
    Task<IEnumerable<StaticData>> GetStaticDataAsync(); // GET all
  }
}
