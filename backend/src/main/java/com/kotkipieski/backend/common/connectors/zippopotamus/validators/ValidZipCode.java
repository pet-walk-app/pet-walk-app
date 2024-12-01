package com.kotkipieski.backend.common.connectors.zippopotamus.validators;

import com.kotkipieski.backend.common.connectors.zippopotamus.validators.impl.ZipCodeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ZipCodeValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidZipCode
{

  String message() default "Invalid Zip Code";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}