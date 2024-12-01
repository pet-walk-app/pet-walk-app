package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.care.mappers.CaregiverResponseMapper;
import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.kotkipieski.backend.users.dtos.CurrentUserProfileDto;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {CaregiverResponseMapper.class, PetOwnerResponseDtoMapper.class, ImageMapper.class})
public abstract class CurrentUserProfileDtoMapper
{

  @Mapping(target = "imageUrl", source = "user.image")
  public abstract CurrentUserProfileDto toCurrentUserProfile(User user);
}
