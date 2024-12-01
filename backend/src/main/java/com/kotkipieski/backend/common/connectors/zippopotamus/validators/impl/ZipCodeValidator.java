package com.kotkipieski.backend.common.connectors.zippopotamus.validators.impl;

import com.kotkipieski.backend.common.connectors.zippopotamus.ZippopotamusConnector;
import com.kotkipieski.backend.common.connectors.zippopotamus.validators.ValidZipCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ZipCodeValidator implements ConstraintValidator<ValidZipCode, String>
{

  private final ZippopotamusConnector zippopotamusConnector;

  @Override
  public boolean isValid(String zipCode, ConstraintValidatorContext context)
  {
    if (zipCode == null || zipCode.isEmpty()) {
      return false;
    }

    return zippopotamusConnector.getPlaceByZipCode(zipCode).isPresent();
  }
}