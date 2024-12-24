package com.petwalkapp.backend.offers.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class OfferNotFoundException extends BaseServerException
{

  private static final String message = "Oferta nie została znaleziona";

  public OfferNotFoundException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}