package com.kotkipieski.backend.common.connectors.zippopotamus.responses;

import lombok.Data;

@Data
public class ZippopotamusPlace
{

  private String placeName;
  private Double longitude;
  private Double latitude;
  private String state;
  private String stateAbbreviation;
}
