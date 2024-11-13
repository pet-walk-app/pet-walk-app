package com.kotkipieski.backend.users.dtos;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse
{

  private Long id;

  @NotBlank
  private String name;

  private String email;

  private LocalDate dateOfBirth;

  private String phone;

  private String imageUrl;

  private CaregiverResponse caregiver;
}
