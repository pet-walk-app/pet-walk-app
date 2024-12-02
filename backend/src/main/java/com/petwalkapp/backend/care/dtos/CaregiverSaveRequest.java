package com.petwalkapp.backend.care.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaregiverSaveRequest
{

  @NotBlank
  private String city;

  @NotBlank
  private String description;
}
