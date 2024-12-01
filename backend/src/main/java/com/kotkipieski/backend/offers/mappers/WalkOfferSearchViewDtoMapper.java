package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.common.utils.DistanceCalculator;
import com.kotkipieski.backend.offers.dtos.WalkOfferSearchViewDto;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.requests.SearchWalkOffersRequest;
import com.kotkipieski.backend.pets.mappers.PetResponseDtoMapper;
import com.kotkipieski.backend.users.mappers.UserOfferSearchDtoMapper;
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
