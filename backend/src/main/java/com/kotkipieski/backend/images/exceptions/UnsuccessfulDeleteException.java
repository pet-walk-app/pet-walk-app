package com.kotkipieski.backend.images.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class UnsuccessfulDeleteException extends BaseServerException
{

  private static final String message = "Image was not deleted, please try again";

  public UnsuccessfulDeleteException()
  {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
