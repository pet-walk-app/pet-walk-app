package com.kotkipieski.backend.care.exceptions;

import com.kotkipieski.backend.security.exceptions.BaseServerException;

public class CaregiverNotCreatedException extends BaseServerException
{

  public static final String MESSAGE = "Action cannot be performed, create a caregiver profile";

  public CaregiverNotCreatedException()
  {
    super(MESSAGE);
  }
}
