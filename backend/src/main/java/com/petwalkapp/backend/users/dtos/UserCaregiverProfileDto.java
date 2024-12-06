package com.petwalkapp.backend.users.dtos;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.pets.dtos.PetOwnerResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCaregiverProfileDto
{

  private Long id;
  private String name;
  private String imageUrl;
  private CaregiverResponse caregiver;
  private PetOwnerResponseDto petOwner;
  private String phone;
}
