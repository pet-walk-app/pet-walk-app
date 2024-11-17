package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.entities.Pet;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = ImageMapper.class)
public interface PetResponseDtoMapper
{

  @Mapping(target = "imageUrl", source = "image")
  PetResponseDto toDto(Pet pet, @Context IImageService imageService);
}
