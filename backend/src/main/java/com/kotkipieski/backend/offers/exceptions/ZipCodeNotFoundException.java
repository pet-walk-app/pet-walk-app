package com.kotkipieski.backend.offers.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class ZipCodeNotFoundException extends BaseServerException
{

  private static final String message = "Zip code could not be found";

  public ZipCodeNotFoundException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}