package com.kotkipieski.backend.user.exceptions;

public class EmailNotAvailableException extends RuntimeException {

  public EmailNotAvailableException(String email) {
    super("The email address " + email + " is already in use.");
  }
}