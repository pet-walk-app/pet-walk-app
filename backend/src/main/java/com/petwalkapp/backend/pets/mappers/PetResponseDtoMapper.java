package com.petwalkapp.backend.pets.mappers;

import com.petwalkapp.backend.images.mappers.ImageMapper;
import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.pets.entities.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = ImageMapper.class)
public abstract class PetResponseDtoMapper
{

  @Mapping(target = "imageUrl", source = "image")
  public abstract PetResponseDto toDto(Pet pet);
}
