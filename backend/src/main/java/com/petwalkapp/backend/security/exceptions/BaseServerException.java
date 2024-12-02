package com.petwalkapp.backend.security.exceptions;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public abstract class BaseServerException extends RuntimeException
{

  private String message;
  private Map<String, String> details;
  private HttpStatus status;

  public BaseServerException(String message)
  {
    this.message = message;
    this.status = HttpStatus.BAD_REQUEST;
  }

  public BaseServerException(String message, HttpStatus status)
  {
    this.message = message;
    this.status = status;
  }
}
