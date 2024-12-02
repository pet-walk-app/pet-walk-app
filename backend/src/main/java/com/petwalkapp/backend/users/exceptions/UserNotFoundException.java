package com.petwalkapp.backend.users.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class UserNotFoundException extends BaseServerException
{

  public UserNotFoundException()
  {
    super("User not found");
  }
}
