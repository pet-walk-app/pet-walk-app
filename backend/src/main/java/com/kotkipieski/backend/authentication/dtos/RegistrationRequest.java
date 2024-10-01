package com.kotkipieski.backend.authentication.dtos;

import static com.kotkipieski.backend.user.entities.User.EMAIL_REGEX;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
  
  @NotBlank(message = "Username cannot be empty")
  @Size(min = 5, max = 64, message = "User name must be of length 5-64")
  private String name;

  @NotBlank(message = "Email cannot be blank")
  @Email(message = "Invalid email", regexp = EMAIL_REGEX)
  private String email;

  @NotNull(message = "Password cannot be null")
  private String password;
}
