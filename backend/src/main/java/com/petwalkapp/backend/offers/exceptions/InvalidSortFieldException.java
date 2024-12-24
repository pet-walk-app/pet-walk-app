package com.petwalkapp.backend.offers.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class InvalidSortFieldException extends BaseServerException
{

  private static final String message = "Nieprawidłowy klucz sortowania, prawidłowe: ";

  public InvalidSortFieldException(String allowedFields)
  {
    super(message + allowedFields, HttpStatus.BAD_REQUEST);
  }
}