package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.entities.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = ImageMapper.class)
public abstract class PetResponseDtoMapper
{

  @Mapping(target = "imageUrl", source = "image")
  public abstract PetResponseDto toDto(Pet pet);
}
