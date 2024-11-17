package com.kotkipieski.backend.pets.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetResponseDto
{

  private Long id;
  private String name;
  private String breed;
  private String description;
  private String imageUrl;
}
