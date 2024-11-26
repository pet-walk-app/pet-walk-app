package com.kotkipieski.backend.users.dtos;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.pets.dtos.PetOwnerResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto
{

  private Long id;
  private String name;
  private String imageUrl;
  private CaregiverResponse caregiver;
  private PetOwnerResponseDto petOwner;
}
