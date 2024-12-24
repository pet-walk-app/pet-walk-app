package com.petwalkapp.backend.users.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class EmailNotAvailableException extends BaseServerException
{

  public EmailNotAvailableException(String email)
  {
    super("Email " + email + " jest już wykorzystany.");
  }
}
