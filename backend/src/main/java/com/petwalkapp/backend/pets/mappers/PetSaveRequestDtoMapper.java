package com.petwalkapp.backend.pets.mappers;

import com.petwalkapp.backend.pets.dtos.PetSaveRequestDto;
import com.petwalkapp.backend.pets.entities.Pet;
import com.petwalkapp.backend.pets.entities.PetOwner;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface PetSaveRequestDtoMapper
{

  @Mapping(target = "owner", expression = "java(petOwner)")
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  Pet toPet(PetSaveRequestDto petSaveRequestDto, @Context PetOwner petOwner);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "image", ignore = true)
  @Mapping(target = "id", ignore = true)
  void updatePetFromDto(PetSaveRequestDto petSaveRequestDto, @MappingTarget Pet pet);
}
