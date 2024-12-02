package com.petwalkapp.backend.pets.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class PetOwnerNotCreatedException extends BaseServerException
{

  private static final String message = "You need to create a pet owner first";

  public PetOwnerNotCreatedException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
