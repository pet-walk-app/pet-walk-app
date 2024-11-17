package com.kotkipieski.backend.pets.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class PetNotFoundException extends BaseServerException
{

  private static final String message = "Pet was not found or you are not the owner";

  public PetNotFoundException()
  {
    super(message, HttpStatus.NOT_FOUND);
  }
}
