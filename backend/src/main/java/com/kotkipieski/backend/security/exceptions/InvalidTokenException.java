package com.kotkipieski.backend.security.exceptions;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenException extends AuthenticationException {

  public InvalidTokenException() {
    super("Token is not valid");
  }
}
