package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.common.connectors.zippopotamus.ZippopotamusConnector;
import com.kotkipieski.backend.common.connectors.zippopotamus.responses.ZippopotamusPlace;
import com.kotkipieski.backend.common.connectors.zippopotamus.responses.ZippopotamusResponse;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.offers.exceptions.ZipCodeNotFoundException;
import com.kotkipieski.backend.offers.requests.UpdateWalkOfferRequest;
import com.kotkipieski.backend.pets.services.IPetService;
import java.time.Instant;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {WalkOfferStatus.class, Instant.class, LocalDateTime.class})
public abstract class UpdateWalkOfferRequestMapper
{

  @Autowired
  private ZippopotamusConnector zippopotamusConnector;

  @Autowired
  private GeometryFactory geometryFactory;

  @Mapping(target = "updatedAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "pets", expression = "java(petService.getPetByIds(request.getPetIds()))")
  @Mapping(target = "zipCodeLocation", expression = "java(zipCodeToLocation(request))")
  public abstract void updateWalkOfferFromDto(UpdateWalkOfferRequest request,
      @MappingTarget WalkOffer walkOffer, @Context IPetService petService);

  @Named("zipCodeToLocation")
  public Point zipCodeToLocation(UpdateWalkOfferRequest request)
  {
    ZippopotamusResponse response = zippopotamusConnector.getPlaceByZipCode(request.getZipCode())
        .orElseThrow(ZipCodeNotFoundException::new);

    ZippopotamusPlace place = response.getPlaces()
        .stream()
        .findFirst()
        .orElseThrow(ZipCodeNotFoundException::new);

    return geometryFactory.createPoint(new Coordinate(place.getLongitude(), place.getLatitude()));
  }
}
