package com.kotkipieski.backend.images.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class UnsuccessfulUploadException extends BaseServerException
{

  private static final String message = "File could not be uploaded, please try again";

  public UnsuccessfulUploadException()
  {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
