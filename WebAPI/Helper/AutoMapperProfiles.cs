using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserDto>().ReverseMap();
      CreateMap<DrinkType, DrinkTypeDto>().ReverseMap();
    }
  }
}
