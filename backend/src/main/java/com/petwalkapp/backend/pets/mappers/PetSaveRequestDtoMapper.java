package com.petwalkapp.backend.pets.mappers;

import com.petwalkapp.backend.pets.dtos.PetSaveRequestDto;
import com.petwalkapp.backend.pets.entities.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface PetSaveRequestDtoMapper
{

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  Pet toPet(PetSaveRequestDto petSaveRequestDto);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  void updatePetFromDto(PetSaveRequestDto petSaveRequestDto, @MappingTarget Pet pet);
}
