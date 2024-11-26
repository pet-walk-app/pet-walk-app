package com.kotkipieski.backend.offers.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class OfferNotFoundException extends BaseServerException
{

  private static final String message = "Offer could not be found";

  public OfferNotFoundException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}