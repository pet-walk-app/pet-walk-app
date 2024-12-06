package com.petwalkapp.backend.security.exceptions;

import org.springframework.http.HttpStatus;

public class NotAllowedException extends BaseServerException
{

  private static final String message = "User cannot perform this action";

  public NotAllowedException()
  {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}