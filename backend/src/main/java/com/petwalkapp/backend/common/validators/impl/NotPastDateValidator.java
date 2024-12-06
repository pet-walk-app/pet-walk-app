package com.petwalkapp.backend.common.validators.impl;

import com.petwalkapp.backend.common.validators.NotPastDate;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class NotPastDateValidator implements ConstraintValidator<NotPastDate, LocalDate>
{

  @Override
  public boolean isValid(LocalDate date, ConstraintValidatorContext context)
  {
    if (date == null) {
      return true; // @NotNull will handle null check
    }
    return !date.isBefore(LocalDate.now());
  }
}