package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.care.CaregiverUtils;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.common.utils.DistanceCalculator;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.mappers.UserOfferSearchDtoMapper;
import org.locationtech.jts.geom.Point;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(uses = {UserOfferSearchDtoMapper.class, PetResponseDtoMapper.class},
    imports = {CaregiverUtils.class})
public interface WalkOfferSearchViewDtoMapper
{

  @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
  PageDto<WalkOfferSearchViewDto> toPageDto(Page<WalkOffer> walkOffers,
      @Context SearchWalkOffersRequest searchRequest, @Context Caregiver currentCaregiver);

  @Mapping(target = "alreadyApplied",
      expression = "java(CaregiverUtils.didCaregiverAppliedForOffer(walkOffer, currentCaregiver))")
  @Mapping(target = "distance", expression = "java(calculationDistance(walkOffer, searchRequest))")
  @Mapping(target = "offerCreator", source = "walkOffer.petOwner.user")
  WalkOfferSearchViewDto toDto(WalkOffer walkOffer, @Context SearchWalkOffersRequest searchRequest,
      @Context Caregiver currentCaregiver);

  default double calculationDistance(WalkOffer walkOffer, SearchWalkOffersRequest searchRequest)
  {
    Point zipCodeLocation = walkOffer.getZipCodeLocation();

    return DistanceCalculator.calculateDistance(zipCodeLocation.getY(), zipCodeLocation.getX(),
        searchRequest.getLatitude(), searchRequest.getLongitude());
  }
}
