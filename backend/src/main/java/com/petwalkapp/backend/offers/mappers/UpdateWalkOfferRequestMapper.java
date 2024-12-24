package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.pets.services.IPetService;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {LocalDateTime.class})
public abstract class UpdateWalkOfferRequestMapper
{

  @Autowired
  private GeometryFactory geometryFactory;

  @Mapping(target = "updatedAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "pets", expression = "java(petService.getUserPetsByIds(request.getPetIds()))")
  @Mapping(target = "zipCodeLocation", expression = "java(toPoint(request))")
  public abstract void updateWalkOfferFromDto(UpdateWalkOfferRequest request,
      @MappingTarget WalkOffer walkOffer, @Context IPetService petService);

  public Point toPoint(UpdateWalkOfferRequest request)
  {
    return geometryFactory.createPoint(
        new Coordinate(request.getLongitude(), request.getLatitude()));
  }
}
// add latitude, longitude