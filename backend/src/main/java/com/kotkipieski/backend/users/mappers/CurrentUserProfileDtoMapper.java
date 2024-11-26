package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.care.mappers.CaregiverResponseMapper;
import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.kotkipieski.backend.users.dtos.CurrentUserProfileDto;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {CaregiverResponseMapper.class, PetOwnerResponseDtoMapper.class})
public interface CurrentUserProfileDtoMapper
{

  @Mapping(target = "imageUrl", expression = "java(imageService.getFullImageUrl(user.getImage()))")
  CurrentUserProfileDto toCurrentUserProfile(User user, @Context IImageService imageService);
}
