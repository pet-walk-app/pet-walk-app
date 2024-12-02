package com.petwalkapp.backend.authentication.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class EmailTakenException extends BaseServerException
{

  public EmailTakenException()
  {
    super("Email is already taken");
  }
}
