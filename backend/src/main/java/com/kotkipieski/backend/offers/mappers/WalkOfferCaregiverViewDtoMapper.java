package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.offers.dtos.WalkOfferCaregiverViewDto;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.kotkipieski.backend.pets.mappers.PetResponseDtoMapper;
import org.mapstruct.Mapper;

@Mapper(uses = {PetOwnerResponseDtoMapper.class, PetResponseDtoMapper.class})
public interface WalkOfferCaregiverViewDtoMapper
{

  WalkOfferCaregiverViewDto toDto(WalkOffer walkOffer);
}
