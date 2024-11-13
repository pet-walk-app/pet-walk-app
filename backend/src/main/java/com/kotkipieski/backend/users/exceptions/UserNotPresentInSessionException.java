package com.kotkipieski.backend.users.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;

public class UserNotPresentInSessionException extends BaseServerException
{

  private static final String message = "User is not present in the session";

  public UserNotPresentInSessionException()
  {
    super(message);
  }
}
