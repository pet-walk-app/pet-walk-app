package com.kotkipieski.backend.common.handlers;

import com.kotkipieski.backend.common.dtos.ErrorResponse;
import com.kotkipieski.backend.common.exceptions.BaseServerException;
import jakarta.validation.ConstraintViolationException;
import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  public static final String RESOURCE_NOT_FOUND = "Resource not found";
  public static final String INVALID_REQUEST = "Invalid request";
  public static final String INVALID_REQUEST_ARGUMENTS = "Invalid request arguments";
  public static final String METHOD_NOT_ALLOWED = "Method Not Allowed";
  public static final String UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type";
  public static final String CONSTRAINT_VIOLATION = "Constraint Violation";
  public static final String DATA_INTEGRITY_VIOLATION = "Data Integrity Violation";
  public static final String INVALID_VALUE = "Invalid value";
  public static final String AN_UNKNOWN_ERROR_HAS_OCCURRED = "An unknown error has occurred";

  @ExceptionHandler({MethodArgumentNotValidException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(
      MethodArgumentNotValidException exception)
  {

    Map<String, String> details = Optional.ofNullable(exception)
        .map(MethodArgumentNotValidException::getBindingResult)
        .map(BindingResult::getAllErrors)
        .map(Collection::stream)
        .orElseGet(Stream::empty)
        .filter(error -> error instanceof FieldError)
        .map(FieldError.class::cast)
        .map(this::mapError)
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue));

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder()
            .message(INVALID_REQUEST_ARGUMENTS)
            .details(details)
            .build());
  }

  @ExceptionHandler({HttpMessageNotReadableException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(
      HttpMessageNotReadableException exception)
  {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder()
            .message(INVALID_REQUEST)
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

  @ExceptionHandler({NoResourceFoundException.class})
  public ResponseEntity<ErrorResponse> handleNoResourceFoundException(
      NoResourceFoundException exception)
  {
    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(ErrorResponse.builder()
            .message(RESOURCE_NOT_FOUND)
            .build());
  }

  @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
  public ResponseEntity<ErrorResponse> handleMethodNotSupported(
      HttpRequestMethodNotSupportedException ex)
  {
    return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
        .body(ErrorResponse.builder()
            .message(METHOD_NOT_ALLOWED)
            .build());
  }

  @ExceptionHandler({HttpMediaTypeNotSupportedException.class})
  public ResponseEntity<ErrorResponse> handleMediaTypeNotSupported(
      HttpMediaTypeNotSupportedException ex)
  {
    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
        .body(ErrorResponse.builder()
            .message(UNSUPPORTED_MEDIA_TYPE)
            .build());
  }

  @ExceptionHandler({ConstraintViolationException.class})
  public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder()
            .message(CONSTRAINT_VIOLATION)
            .build());
  }

  @ExceptionHandler({NoHandlerFoundException.class})
  public ResponseEntity<ErrorResponse> handleNoHandlerFound(NoHandlerFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ErrorResponse.builder()
            .message(RESOURCE_NOT_FOUND)
            .build());
  }

  @ExceptionHandler({DataIntegrityViolationException.class})
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
      DataIntegrityViolationException ex)
  {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ErrorResponse.builder()
            .message(DATA_INTEGRITY_VIOLATION)
            .build());
  }

  @ExceptionHandler({Exception.class})
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
      Exception ex)
  {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ErrorResponse.builder()
            .message(AN_UNKNOWN_ERROR_HAS_OCCURRED)
            .build());
  }

  private Map.Entry<String, String> mapError(FieldError error) {
    return Map.entry(error.getField(),
        Optional.ofNullable(error.getDefaultMessage()).orElse(INVALID_VALUE));
  }
}
