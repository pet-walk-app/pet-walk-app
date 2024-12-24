package com.petwalkapp.backend.care.exceptions;

import com.petwalkapp.backend.security.exceptions.BaseServerException;

public class CaregiverNotCreatedException extends BaseServerException
{

  public static final String MESSAGE = "Akcja nie może być wykonana, założ profil opiekuna";

  public CaregiverNotCreatedException()
  {
    super(MESSAGE);
  }
}
