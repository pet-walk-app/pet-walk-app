package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.common.connectors.googlemaps.GoogleMapsAPIConnector;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.pets.services.IPetService;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.GeometryFactory;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {LocalDateTime.class}, uses = {ZipCodeMapper.class})
public abstract class UpdateWalkOfferRequestMapper
{

  @Autowired
  private GoogleMapsAPIConnector googleMapsAPIConnector;

  @Autowired
  private GeometryFactory geometryFactory;

  @Mapping(target = "updatedAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "pets", expression = "java(petService.getUserPetsByIds(request.getPetIds()))")
  @Mapping(target = "zipCodeLocation", source = "zipCode")
  public abstract void updateWalkOfferFromDto(UpdateWalkOfferRequest request,
      @MappingTarget WalkOffer walkOffer, @Context IPetService petService);
}
