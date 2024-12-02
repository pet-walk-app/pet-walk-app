package com.petwalkapp.backend.pets.mappers;

import com.petwalkapp.backend.images.mappers.ImageMapper;
import com.petwalkapp.backend.pets.dtos.PetOwnerResponseDto;
import com.petwalkapp.backend.pets.entities.PetOwner;
import org.mapstruct.Mapper;

@Mapper(uses = {ImageMapper.class, PetResponseDtoMapper.class})
public interface PetOwnerResponseDtoMapper
{

  PetOwnerResponseDto toDto(PetOwner petOwner);
}
