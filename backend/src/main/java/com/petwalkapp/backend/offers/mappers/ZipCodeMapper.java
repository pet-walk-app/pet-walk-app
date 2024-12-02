package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.common.connectors.googlemaps.GoogleMapsAPIConnector;
import com.petwalkapp.backend.common.connectors.googlemaps.responses.GeocodeResponse;
import com.petwalkapp.backend.offers.exceptions.ZipCodeNotFoundException;
import java.util.ArrayList;
import java.util.Optional;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public abstract class ZipCodeMapper
{

  @Autowired
  private GoogleMapsAPIConnector googleMapsAPIConnector;

  @Autowired
  private GeometryFactory geometryFactory;

  public Point toPoint(String zipCode)
  {
    GeocodeResponse response = googleMapsAPIConnector.getPlaceByZipCode(zipCode)
        .orElseThrow(ZipCodeNotFoundException::new);

    GeocodeResponse.Location geometry = Optional.ofNullable(response.getResults())
        .orElseGet(ArrayList::new)
        .stream()
        .findFirst()
        .map(GeocodeResponse.Result::getGeometry)
        .map(GeocodeResponse.Geometry::getLocation)
        .orElseThrow(ZipCodeNotFoundException::new);

    return geometryFactory.createPoint(new Coordinate(geometry.getLng(), geometry.getLat()));
  }
}
