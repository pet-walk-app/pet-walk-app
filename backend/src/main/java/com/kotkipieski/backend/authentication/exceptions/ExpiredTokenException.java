package com.kotkipieski.backend.authentication.exceptions;

import org.springframework.security.core.AuthenticationException;

public class ExpiredTokenException extends AuthenticationException implements IExceptionWithPublicMessage {

  public static final String EXPIRED_TOKEN = "Expired token";

  public ExpiredTokenException() {
    super(EXPIRED_TOKEN);
  }

  @Override
  public String getPublicErrorMessage() {
    return EXPIRED_TOKEN;
  }
}
