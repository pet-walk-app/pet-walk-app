package com.petwalkapp.backend.users.dtos;

import static com.petwalkapp.backend.users.entities.User.EMAIL_REGEX;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest
{

  @NotBlank
  @Size(min = 5, max = 64)
  private String name;

  @Email(regexp = EMAIL_REGEX)
  private String email;

  @Size(min = 5, max = 64)
  private String password;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate dateOfBirth;

  @NotBlank
  private String phone;
}
