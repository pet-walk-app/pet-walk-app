package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.care.CaregiverUtils;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferPendingViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.mappers.UserOfferSearchDtoMapper;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(uses = {UserOfferSearchDtoMapper.class, PetResponseDtoMapper.class}, imports = {
    CaregiverUtils.class})
public interface WalkOfferPendingViewDtoMapper
{

  @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
  PageDto<WalkOfferPendingViewDto> toPageDto(Page<WalkOffer> walkOffers,
      @Context Caregiver currentCaregiver);

  @Mapping(target = "alreadyApplied", expression = "java(CaregiverUtils.didCaregiverAppliedForOffer(walkOffer, currentCaregiver))")
  @Mapping(target = "offerCreator", source = "walkOffer.petOwner.user")
  WalkOfferPendingViewDto toDto(WalkOffer walkOffer, @Context Caregiver currentCaregiver);
}
