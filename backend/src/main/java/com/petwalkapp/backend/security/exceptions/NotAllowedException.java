package com.petwalkapp.backend.security.exceptions;

import org.springframework.http.HttpStatus;

public class NotAllowedException extends BaseServerException
{

  private static final String message = "Użytkownik nie może wykonać tej akcji";

  public NotAllowedException()
  {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}