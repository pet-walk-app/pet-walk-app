package com.petwalkapp.backend.authentication.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class BadCredentialsException extends BaseServerException
{

  public BadCredentialsException()
  {
    super("Provided user credentials are not valid");
    setStatus(HttpStatus.UNAUTHORIZED);
  }
}
