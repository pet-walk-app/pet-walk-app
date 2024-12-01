package com.kotkipieski.backend.common.connectors.zippopotamus.responses;

import java.util.List;
import lombok.Data;

@Data
public class ZippopotamusResponse
{

  private String postCode;
  private String country;
  private String countryAbbreviation;
  private List<ZippopotamusPlace> places;
}
