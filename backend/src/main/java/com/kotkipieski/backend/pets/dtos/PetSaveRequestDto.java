package com.kotkipieski.backend.pets.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetSaveRequestDto
{

  @NotBlank
  private String name;

  @NotBlank
  private String breed;

  @NotBlank
  private String description;
}
