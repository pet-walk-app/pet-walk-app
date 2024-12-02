package com.petwalkapp.backend.common.connectors.googlemaps;

import com.petwalkapp.backend.common.connectors.eceptions.InvalidGoogleMapsApiKeyException;
import com.petwalkapp.backend.common.connectors.googlemaps.responses.GeocodeResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class GoogleMapsAPIConnector
{

  @Value("${pet-walk-app.google-maps-api-key}")
  private String GOOGLE_MAPS_API_KEY;

  private static final String GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  private static final String REGION = "PL";
  private static final String LANGUAGE = "pl";

  public Optional<GeocodeResponse> getPlaceByZipCode(String zipCode)
  {
    return getPlaceByAddress(zipCode + ",PL");
  }

  public Optional<GeocodeResponse> getPlaceByAddress(String address)
  {
    RestTemplate restTemplate = new RestTemplate();
    try {
      ResponseEntity<GeocodeResponse> response = restTemplate.getForEntity(buildUrl(address),
          GeocodeResponse.class);

      if (response.getStatusCode() == HttpStatus.FORBIDDEN) {
        throw new InvalidGoogleMapsApiKeyException();
      }

      if (!response.getStatusCode().is2xxSuccessful()) {
        return Optional.empty();
      }

      return Optional.ofNullable(response.getBody());
    } catch (Exception e) {
      return Optional.empty();
    }
  }

  private String buildUrl(String address)
  {
    return UriComponentsBuilder.fromHttpUrl(GEOCODE_URL)
        .queryParam("address", address)
        .queryParam("key", GOOGLE_MAPS_API_KEY)
        .queryParam("region", REGION)
        .queryParam("language", LANGUAGE)
        .toUriString();
  }
}
