package com.petwalkapp.backend.users.mappers;

import com.petwalkapp.backend.images.mappers.ImageMapper;
import com.petwalkapp.backend.users.dtos.UserOfferAcceptedDto;
import com.petwalkapp.backend.users.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ImageMapper.class})
public abstract class UserOfferAcceptedDtoMapper
{

  @Mapping(target = "imageUrl", source = "user.image")
  public abstract UserOfferAcceptedDto toDto(User user);
}
