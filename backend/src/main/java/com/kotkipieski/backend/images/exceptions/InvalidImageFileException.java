package com.kotkipieski.backend.images.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;

public class InvalidImageFileException extends BaseServerException
{

  public static final String MESSAGE = "Invalid image file";

  public InvalidImageFileException()
  {
    super(MESSAGE);
  }
}
