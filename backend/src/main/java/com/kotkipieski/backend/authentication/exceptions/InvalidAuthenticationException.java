package com.kotkipieski.backend.authentication.exceptions;

public class InvalidAuthenticationException extends RuntimeException {

  public InvalidAuthenticationException() {
    super("Authentication data is not correct");
  }
}
