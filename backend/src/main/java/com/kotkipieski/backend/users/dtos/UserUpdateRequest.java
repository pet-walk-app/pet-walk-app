package com.kotkipieski.backend.users.dtos;

import static com.kotkipieski.backend.users.entities.User.EMAIL_REGEX;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest
{

  @NotBlank
  @Size(min = 5, max = 64)
  private String name;

  @NotBlank
  @Email(regexp = EMAIL_REGEX)
  private String email;

  @Size(min = 5, max = 64)
  private String password;

  private LocalDate dateOfBirth;

  private String phone;
}
