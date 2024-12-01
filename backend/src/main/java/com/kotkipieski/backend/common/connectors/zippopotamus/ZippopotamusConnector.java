package com.kotkipieski.backend.common.connectors.zippopotamus;

import com.kotkipieski.backend.common.connectors.zippopotamus.responses.ZippopotamusResponse;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ZippopotamusConnector
{

  private static final String ZIPPOTAMUS_API_URL = "https://api.zippopotam.us/pl/";

  public Optional<ZippopotamusResponse> getPlaceByZipCode(String zipCode)
  {
    RestTemplate restTemplate = new RestTemplate();
    String apiUrl = ZIPPOTAMUS_API_URL + zipCode;

    try {
      ResponseEntity<ZippopotamusResponse> response = restTemplate.getForEntity(apiUrl,
          ZippopotamusResponse.class);

      if (!response.getStatusCode().is2xxSuccessful()) {
        return Optional.empty();
      }

      return Optional.ofNullable(response.getBody());
    } catch (Exception e) {
      return Optional.empty();
    }
  }
}
