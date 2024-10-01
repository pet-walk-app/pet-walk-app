package com.kotkipieski.backend.authentication.exceptions;

public class EmailTakenException extends RuntimeException {

  public EmailTakenException() {
    super("Email is already taken");
  }
}
