package com.kotkipieski.backend.images.exceptions;

import static com.kotkipieski.backend.images.services.impl.ImageService.ALLOWED_EXTENSIONS;

import com.kotkipieski.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class InvalidFileExtensionException extends BaseServerException
{

  private static final String message = "File extension is invalid, allows extensions are: "
      + String.join(", ", ALLOWED_EXTENSIONS);

  public InvalidFileExtensionException()
  {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
