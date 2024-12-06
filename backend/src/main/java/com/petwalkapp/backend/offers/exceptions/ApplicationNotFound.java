package com.petwalkapp.backend.offers.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class ApplicationNotFound extends BaseServerException
{

  private static final String message = "Specified application not found";

  public ApplicationNotFound()
  {
    super(message, HttpStatus.NOT_FOUND);
  }
}