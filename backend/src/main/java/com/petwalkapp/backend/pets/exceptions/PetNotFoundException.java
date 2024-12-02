package com.petwalkapp.backend.pets.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class PetNotFoundException extends BaseServerException
{

  private static final String message = "Pet was not found";

  public PetNotFoundException()
  {
    super(message, HttpStatus.NOT_FOUND);
  }
}
