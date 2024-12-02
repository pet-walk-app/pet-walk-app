package com.petwalkapp.backend.care.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class CaregiverNotCreatedException extends BaseServerException
{

  public static final String MESSAGE = "Action cannot be performed, create a caregiver profile";

  public CaregiverNotCreatedException()
  {
    super(MESSAGE);
  }
}
