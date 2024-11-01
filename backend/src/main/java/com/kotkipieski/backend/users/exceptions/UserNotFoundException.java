package com.kotkipieski.backend.users.exceptions;

import com.kotkipieski.backend.common.exceptions.BaseServerException;

public class UserNotFoundException extends BaseServerException {

  public UserNotFoundException() {
    super("User not found");
  }
}
