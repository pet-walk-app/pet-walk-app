package com.petwalkapp.backend.images.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class UnsuccessfulUploadException extends BaseServerException
{

  private static final String message = "Bład zapisu pliku, spróbuj ponownie";

  public UnsuccessfulUploadException()
  {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
