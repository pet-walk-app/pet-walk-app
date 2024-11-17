package com.kotkipieski.backend.pets.dtos;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetOwnerResponseDto
{

  private List<PetResponseDto> pets;
}
