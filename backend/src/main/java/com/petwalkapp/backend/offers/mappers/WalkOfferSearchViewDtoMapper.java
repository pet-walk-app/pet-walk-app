package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.common.utils.DistanceCalculator;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.mappers.UserOfferSearchDtoMapper;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {UserOfferSearchDtoMapper.class, PetResponseDtoMapper.class}, imports = {
    DistanceCalculator.class})
public interface WalkOfferSearchViewDtoMapper
{

  @Mapping(target = "distance", expression = "java(calculationDistance(walkOffer, searchRequest))")
  @Mapping(target = "offerCreator", source = "walkOffer.petOwner.user")
  WalkOfferSearchViewDto toDto(WalkOffer walkOffer, @Context SearchWalkOffersRequest searchRequest);

  default double calculationDistance(WalkOffer walkOffer, SearchWalkOffersRequest searchRequest)
  {
    Point zipCodeLocation = walkOffer.getZipCodeLocation();

    return DistanceCalculator.calculateDistance(zipCodeLocation.getY(), zipCodeLocation.getX(),
        searchRequest.getLatitude(), searchRequest.getLongitude());
  }
}
