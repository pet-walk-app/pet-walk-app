package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.offers.dtos.WalkOfferApplicationDto;
import com.petwalkapp.backend.offers.entities.WalkOfferApplication;
import com.petwalkapp.backend.users.mappers.UserCaregiverProfileDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {UserCaregiverProfileDtoMapper.class})
public interface WalkOfferApplicationDtoMapper
{

  @Mapping(target = "caregiver", source = "caregiver.user")
  WalkOfferApplicationDto toDto(WalkOfferApplication walkOfferApplication);
}
