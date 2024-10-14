package com.kotkipieski.backend.authentication.exceptions;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenException extends AuthenticationException implements IExceptionWithPublicMessage {

  public static final String INVALID_TOKEN = "Invalid token";

  public InvalidTokenException() {
    super(INVALID_TOKEN);
  }

  @Override
  public String getPublicErrorMessage() {
    return INVALID_TOKEN;
  }
}
