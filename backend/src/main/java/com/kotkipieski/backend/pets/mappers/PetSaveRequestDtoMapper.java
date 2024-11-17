package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.pets.dtos.PetSaveRequestDto;
import com.kotkipieski.backend.pets.entities.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface PetSaveRequestDtoMapper
{

  @Mapping(target = "walkOffers", ignore = true)
  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  Pet toPet(PetSaveRequestDto petSaveRequestDto);

  @Mapping(target = "walkOffers", ignore = true)
  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  void updatePetFromDto(PetSaveRequestDto petSaveRequestDto, @MappingTarget Pet pet);
}
