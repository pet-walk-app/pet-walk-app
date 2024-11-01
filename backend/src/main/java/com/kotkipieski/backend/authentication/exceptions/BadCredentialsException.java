package com.kotkipieski.backend.authentication.exceptions;

import com.kotkipieski.backend.common.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class BadCredentialsException extends BaseServerException {

  public BadCredentialsException() {
    super("Provided user credentials are not valid");
    setStatus(HttpStatus.UNAUTHORIZED);
  }
}
