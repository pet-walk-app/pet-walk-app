package com.kotkipieski.backend.authentication.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;

public class EmailTakenException extends BaseServerException
{

  public EmailTakenException()
  {
    super("Email is already taken");
  }
}
