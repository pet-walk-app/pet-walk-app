package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.users.dtos.UserOfferSearchDto;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ImageMapper.class})
public abstract class UserOfferSearchDtoMapper
{

  @Mapping(target = "imageUrl", source = "user.image")
  public abstract UserOfferSearchDto toDto(User user);
}
