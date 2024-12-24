package com.petwalkapp.backend.users.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class UserNotPresentInSessionException extends BaseServerException
{

  private static final String message = "Użytkownik nie zostal znaleziony w sesji";

  public UserNotPresentInSessionException()
  {
    super(message);
  }
}
