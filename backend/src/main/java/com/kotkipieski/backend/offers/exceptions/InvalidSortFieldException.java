package com.kotkipieski.backend.offers.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class InvalidSortFieldException extends BaseServerException
{

  private static final String message = "Invalid sort field, allowed: ";

  public InvalidSortFieldException(String allowedFields)
  {
    super(message + allowedFields, HttpStatus.BAD_REQUEST);
  }
}