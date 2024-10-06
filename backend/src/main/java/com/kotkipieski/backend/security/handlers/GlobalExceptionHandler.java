package com.kotkipieski.backend.security.handlers;

import com.kotkipieski.backend.common.dtos.ErrorResponse;
import com.kotkipieski.backend.common.exceptions.BaseServerException;
import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler({MethodArgumentNotValidException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(
      MethodArgumentNotValidException exception) {

    Map<String, String> details = Optional.ofNullable(exception)
        .map(MethodArgumentNotValidException::getBindingResult)
        .map(BindingResult::getAllErrors).stream()
        .flatMap(Collection::stream)
        .filter(error -> error instanceof FieldError)
        .map(FieldError.class::cast)
        .map(error -> Map.entry(error.getField(),
            Optional.ofNullable(error.getDefaultMessage()).orElse("Invalid value")))
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue));

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder()
            .message("Invalid request arguments")
            .details(details)
            .build());
  }

  @ExceptionHandler({HttpMessageNotReadableException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(
      HttpMessageNotReadableException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder()
            .message("Invalid request")
            .build());
  }

  @ExceptionHandler({BaseServerException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(BaseServerException exception) {
    return ResponseEntity
        .status(exception.getStatus())
        .body(ErrorResponse.builder()
            .message(exception.getMessage())
            .details(exception.getDetails())
            .build());
  }

  @ExceptionHandler({RuntimeException.class})
  public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException exception) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ErrorResponse.builder()
            .message("Request could not be processed, an unknown error occurred")
            .build());
  }

}
