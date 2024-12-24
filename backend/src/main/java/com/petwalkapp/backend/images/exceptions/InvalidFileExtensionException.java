package com.petwalkapp.backend.images.exceptions;

import static com.petwalkapp.backend.images.services.impl.ImageService.ALLOWED_EXTENSIONS;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.springframework.http.HttpStatus;

public class InvalidFileExtensionException extends BaseServerException
{

  private static final String message = "Nieprawidłowe rozszerzenie pliku, prawidłowe: "
      + String.join(", ", ALLOWED_EXTENSIONS);

  public InvalidFileExtensionException()
  {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
