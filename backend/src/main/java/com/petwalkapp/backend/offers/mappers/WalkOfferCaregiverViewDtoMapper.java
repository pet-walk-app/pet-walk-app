package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.offers.dtos.WalkOfferCaregiverViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import org.mapstruct.Mapper;

@Mapper(uses = {PetOwnerResponseDtoMapper.class, PetResponseDtoMapper.class})
public interface WalkOfferCaregiverViewDtoMapper
{

  WalkOfferCaregiverViewDto toDto(WalkOffer walkOffer);
}
