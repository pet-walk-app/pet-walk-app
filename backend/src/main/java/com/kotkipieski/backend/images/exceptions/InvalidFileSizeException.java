package com.kotkipieski.backend.images.exceptions;

import static com.kotkipieski.backend.images.services.impl.ImageService.MAX_FILE_SIZE;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.apache.commons.io.FileUtils;

public class InvalidFileSizeException extends BaseServerException
{

  private static final String message = "File size exceeds maximum allowed - " + FileUtils
      .byteCountToDisplaySize(MAX_FILE_SIZE);

  public InvalidFileSizeException()
  {
    super(message);
  }
}
