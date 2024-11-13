package com.kotkipieski.backend.authentication.dtos;

import static com.kotkipieski.backend.users.entities.User.EMAIL_REGEX;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest
{

  @NotBlank
  @Size(min = 5, max = 64)
  private String name;

  @NotBlank
  @Email(regexp = EMAIL_REGEX)
  private String email;

  @NotBlank
  private String password;
}
