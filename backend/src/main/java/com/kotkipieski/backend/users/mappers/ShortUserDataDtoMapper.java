package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.users.dtos.ShortUserDataDto;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ShortUserDataDtoMapper
{

  @Mapping(target = "imageUrl", expression = "java(imageService.getFullImageUrl(user.getImage()))")
  ShortUserDataDto toDto(User user, @Context IImageService imageService);
}
