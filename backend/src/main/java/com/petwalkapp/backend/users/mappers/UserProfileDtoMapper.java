package com.petwalkapp.backend.users.mappers;

import com.petwalkapp.backend.care.mappers.CaregiverResponseMapper;
import com.petwalkapp.backend.images.mappers.ImageMapper;
import com.petwalkapp.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.petwalkapp.backend.users.dtos.UserProfileDto;
import com.petwalkapp.backend.users.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {CaregiverResponseMapper.class, PetOwnerResponseDtoMapper.class, ImageMapper.class})
public abstract class UserProfileDtoMapper
{

  @Mapping(target = "imageUrl", source = "user.image")
  public abstract UserProfileDto toUserProfile(User user);
}
