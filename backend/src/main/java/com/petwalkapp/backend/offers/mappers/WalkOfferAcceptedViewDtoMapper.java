package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.care.CaregiverUtils;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferAcceptedViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.dtos.UserOfferAcceptedDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(uses = {PetOwnerResponseDtoMapper.class, PetResponseDtoMapper.class,
    UserOfferAcceptedDto.class}, imports = {CaregiverUtils.class})
public interface WalkOfferAcceptedViewDtoMapper
{

  @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
  PageDto<WalkOfferAcceptedViewDto> toPageDto(Page<WalkOffer> walkOffers,
      @Context Caregiver currentCaregiver);

  @Mapping(target = "alreadyApplied",
      expression = "java(CaregiverUtils.didCaregiverAppliedForOffer(walkOffer, currentCaregiver))")
  @Mapping(target = "offerCreator", source = "walkOffer.petOwner.user")
  WalkOfferAcceptedViewDto toDto(WalkOffer walkOffer, @Context Caregiver currentCaregiver);
}
