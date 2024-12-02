package com.petwalkapp.backend.common.connectors.eceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class InvalidGoogleMapsApiKeyException extends BaseServerException
{

  public static final String MESSAGE = "Missing or invalid Google Maps api key";

  public InvalidGoogleMapsApiKeyException()
  {
    super(MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
