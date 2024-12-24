package com.petwalkapp.backend.images.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class InvalidImageFileException extends BaseServerException
{

  public static final String MESSAGE = "Nieprawidłowy plik";

  public InvalidImageFileException()
  {
    super(MESSAGE);
  }
}
