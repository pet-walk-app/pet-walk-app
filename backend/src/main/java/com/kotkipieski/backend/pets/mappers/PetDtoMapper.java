package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.pets.dtos.PetDto;
import com.kotkipieski.backend.pets.entities.Pet;
import org.mapstruct.Mapper;

@Mapper
public interface PetDtoMapper
{

  PetDto toDto(Pet pet);
}
