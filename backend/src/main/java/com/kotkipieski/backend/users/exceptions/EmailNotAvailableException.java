package com.kotkipieski.backend.users.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;

public class EmailNotAvailableException extends BaseServerException
{

  public EmailNotAvailableException(String email)
  {
    super("The email address " + email + " is already in use.");
  }
}
