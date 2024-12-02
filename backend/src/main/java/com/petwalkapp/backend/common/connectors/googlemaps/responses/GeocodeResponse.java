package com.petwalkapp.backend.common.connectors.googlemaps.responses;

import java.util.List;
import lombok.Data;

@Data
public class GeocodeResponse
{

  private List<Result> results;

  @Data
  public static class Result
  {

    private List<AddressComponent> address_components;
    private Geometry geometry;
  }

  @Data
  public static class AddressComponent
  {

    private String long_name;
    private String short_name;
    private List<String> types;
  }

  @Data
  public static class Geometry
  {

    private Location location;
  }

  @Data
  public static class Location
  {

    private Double lat;
    private Double lng;
  }
}
