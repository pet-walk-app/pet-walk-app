package com.kotkipieski.backend.user.exceptions;

import com.kotkipieski.backend.common.exceptions.BaseServerException;

public class UserNotFoundException extends BaseServerException {

  public UserNotFoundException() {
    super("User not found");
  }
}
