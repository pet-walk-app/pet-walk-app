package com.petwalkapp.backend.images.exceptions;

import static com.petwalkapp.backend.images.services.impl.ImageService.MAX_FILE_SIZE;

import com.petwalkapp.backend.security.exceptions.BaseServerException;
import org.apache.commons.io.FileUtils;

public class InvalidFileSizeException extends BaseServerException
{

  private static final String message = "Rozmiar pliku jest zbyt duży, maksymalny - " + FileUtils
      .byteCountToDisplaySize(MAX_FILE_SIZE);

  public InvalidFileSizeException()
  {
    super(message);
  }
}
