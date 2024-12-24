package com.petwalkapp.backend.pets.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class PetOwnerNotCreatedException extends BaseServerException
{

  private static final String message = "Aby wykonać tę akcję, dodaj zwierze";

  public PetOwnerNotCreatedException()
  {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
