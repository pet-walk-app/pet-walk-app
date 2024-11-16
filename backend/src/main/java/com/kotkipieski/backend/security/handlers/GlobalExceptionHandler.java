package com.kotkipieski.backend.security.handlers;

import static com.kotkipieski.backend.security.constants.ErrorConstants.AN_UNKNOWN_ERROR_HAS_OCCURRED;
import static com.kotkipieski.backend.security.constants.ErrorConstants.AUTHENTICATION_ERROR;
import static com.kotkipieski.backend.security.constants.ErrorConstants.CONSTRAINT_VIOLATION;
import static com.kotkipieski.backend.security.constants.ErrorConstants.DATA_INTEGRITY_VIOLATION;
import static com.kotkipieski.backend.security.constants.ErrorConstants.EXPIRED_TOKEN;
import static com.kotkipieski.backend.security.constants.ErrorConstants.INVALID_REQUEST;
import static com.kotkipieski.backend.security.constants.ErrorConstants.INVALID_REQUEST_ARGUMENTS;
import static com.kotkipieski.backend.security.constants.ErrorConstants.INVALID_TOKEN;
import static com.kotkipieski.backend.security.constants.ErrorConstants.INVALID_VALUE;
import static com.kotkipieski.backend.security.constants.ErrorConstants.MAX_FILE_SIZE_EXCEEDED;
import static com.kotkipieski.backend.security.constants.ErrorConstants.METHOD_NOT_ALLOWED;
import static com.kotkipieski.backend.security.constants.ErrorConstants.RESOURCE_NOT_FOUND;
import static com.kotkipieski.backend.security.constants.ErrorConstants.UNSUPPORTED_MEDIA_TYPE;

import com.kotkipieski.backend.security.dtos.ErrorResponse;
import com.kotkipieski.backend.security.exceptions.BaseServerException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.validation.ConstraintViolationException;
import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler
{

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

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder().message(INVALID_REQUEST_ARGUMENTS).details(details).build());
  }

  @ExceptionHandler({HttpMessageNotReadableException.class})
  public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException()
  {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder().message(INVALID_REQUEST).build());
  }

  @ExceptionHandler({BaseServerException.class})
  public ResponseEntity<ErrorResponse> handleBaseException(BaseServerException exception)
  {
    return ResponseEntity.status(exception.getStatus())
        .body(ErrorResponse.builder()
            .message(exception.getMessage())
            .details(exception.getDetails())
            .build());
  }

  @ExceptionHandler({NoResourceFoundException.class})
  public ResponseEntity<ErrorResponse> handleNoResourceFoundException()
  {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ErrorResponse.builder().message(RESOURCE_NOT_FOUND).build());
  }

  @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
  public ResponseEntity<ErrorResponse> handleMethodNotSupported()
  {
    return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
        .body(ErrorResponse.builder().message(METHOD_NOT_ALLOWED).build());
  }

  @ExceptionHandler({HttpMediaTypeNotSupportedException.class})
  public ResponseEntity<ErrorResponse> handleMediaTypeNotSupported()
  {
    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
        .body(ErrorResponse.builder().message(UNSUPPORTED_MEDIA_TYPE).build());
  }

  @ExceptionHandler({ConstraintViolationException.class})
  public ResponseEntity<ErrorResponse> handleConstraintViolation()
  {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder().message(CONSTRAINT_VIOLATION).build());
  }

  @ExceptionHandler({NoHandlerFoundException.class})
  public ResponseEntity<ErrorResponse> handleNoHandlerFound()
  {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ErrorResponse.builder().message(RESOURCE_NOT_FOUND).build());
  }

  @ExceptionHandler({DataIntegrityViolationException.class})
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolation()
  {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ErrorResponse.builder().message(DATA_INTEGRITY_VIOLATION).build());
  }

  @ExceptionHandler({UnsupportedJwtException.class, MalformedJwtException.class,
      SignatureException.class})
  public ResponseEntity<ErrorResponse> handleInvalidTokenException()
  {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ErrorResponse.builder().message(INVALID_TOKEN).build());
  }

  @ExceptionHandler({ExpiredJwtException.class})
  public ResponseEntity<ErrorResponse> handleExpiredTokenException()
  {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ErrorResponse.builder().message(EXPIRED_TOKEN).build());
  }

  @ExceptionHandler({AuthenticationException.class, JwtException.class})
  public ResponseEntity<ErrorResponse> handleAuthenticationException()
  {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ErrorResponse.builder().message(AUTHENTICATION_ERROR).build());
  }

  @ExceptionHandler({MaxUploadSizeExceededException.class})
  public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceeded(
      MaxUploadSizeExceededException exception)
  {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ErrorResponse.builder().message(MAX_FILE_SIZE_EXCEEDED).build());
  }

  @ExceptionHandler({Exception.class})
  public ResponseEntity<ErrorResponse> handleUnknownException(Exception e)
  {
    log.warn("Unknown exception:", e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ErrorResponse.builder().message(AN_UNKNOWN_ERROR_HAS_OCCURRED).build());
  }

  private Map.Entry<String, String> mapError(FieldError error)
  {
    return Map.entry(error.getField(), Optional.ofNullable(error.getDefaultMessage())
        .orElse(INVALID_VALUE));
  }
}
