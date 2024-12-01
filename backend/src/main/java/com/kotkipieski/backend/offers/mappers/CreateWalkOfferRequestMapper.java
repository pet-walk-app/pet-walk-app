package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.common.connectors.zippopotamus.ZippopotamusConnector;
import com.kotkipieski.backend.common.connectors.zippopotamus.responses.ZippopotamusPlace;
import com.kotkipieski.backend.common.connectors.zippopotamus.responses.ZippopotamusResponse;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.offers.exceptions.ZipCodeNotFoundException;
import com.kotkipieski.backend.offers.requests.CreateWalkOfferRequest;
import com.kotkipieski.backend.pets.services.IPetService;
import java.time.Instant;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {WalkOfferStatus.class, Instant.class, LocalDateTime.class})
public abstract class CreateWalkOfferRequestMapper
{

  @Autowired
  private ZippopotamusConnector zippopotamusConnector;

  @Autowired
  private GeometryFactory geometryFactory;

  @Autowired
  protected IPetService petService;

  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "status", expression = "java(WalkOfferStatus.OPEN)")
  @Mapping(target = "pets", expression = "java(petService.getPetByIds(request.getPetIds()))")
  @Mapping(target = "petOwner", expression = "java(petService.getCurrentPetOwner())")
  @Mapping(target = "zipCodeLocation", expression = "java(zipCodeToLocation(request))")
  @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "careProposals", ignore = true)
  @Mapping(target = "selectedCaregiver", ignore = true)
  public abstract WalkOffer toWalkOffer(CreateWalkOfferRequest request);

  @Named("zipCodeToLocation")
  public Point zipCodeToLocation(CreateWalkOfferRequest request)
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
