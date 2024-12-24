package com.petwalkapp.backend.images.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class UnsuccessfulDeleteException extends BaseServerException
{

  private static final String message = "Zdjęcie nie zostało usunięte, spróbuj ponownie";

  public UnsuccessfulDeleteException()
  {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
