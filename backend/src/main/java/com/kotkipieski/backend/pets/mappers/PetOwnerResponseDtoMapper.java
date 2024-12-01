package com.kotkipieski.backend.pets.mappers;

import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.pets.dtos.PetOwnerResponseDto;
import com.kotkipieski.backend.pets.entities.PetOwner;
import org.mapstruct.Mapper;

@Mapper(uses = {ImageMapper.class, PetResponseDtoMapper.class})
public interface PetOwnerResponseDtoMapper
{

  PetOwnerResponseDto toDto(PetOwner petOwner);
}
