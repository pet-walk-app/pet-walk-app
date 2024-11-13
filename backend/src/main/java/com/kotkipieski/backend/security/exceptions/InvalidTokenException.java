package com.kotkipieski.backend.security.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends BaseServerException
{

  private static final String message = "Invalid token";

  public InvalidTokenException()
  {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
