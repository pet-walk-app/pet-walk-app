package com.petwalkapp.backend.offers.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class AlreadyAppliedException extends BaseServerException
{

  private static final String message = "User already applied to this offer";

  public AlreadyAppliedException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}