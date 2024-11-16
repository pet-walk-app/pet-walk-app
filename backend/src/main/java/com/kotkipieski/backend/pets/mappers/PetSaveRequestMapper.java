package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.pets.dtos.PetSaveRequest;
import com.kotkipieski.backend.pets.entities.Pet;
import org.mapstruct.Mapper;

@Mapper
public interface PetSaveRequestMapper
{

  Pet toPet(PetSaveRequest petSaveRequest);
}
