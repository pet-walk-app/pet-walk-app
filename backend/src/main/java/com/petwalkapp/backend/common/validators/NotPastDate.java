package com.petwalkapp.backend.common.validators;

import com.petwalkapp.backend.common.validators.impl.NotPastDateValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = NotPastDateValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotPastDate
{

  String message() default "The date must not be in the past";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}