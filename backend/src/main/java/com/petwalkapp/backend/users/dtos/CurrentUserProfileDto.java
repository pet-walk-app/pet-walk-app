package com.petwalkapp.backend.users.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.pets.dtos.PetOwnerResponseDto;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurrentUserProfileDto
{

  private Long id;
  private String name;
  private String email;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dateOfBirth;

  private String phone;
  private String imageUrl;
  private CaregiverResponse caregiver;
  private PetOwnerResponseDto petOwner;
  private boolean isFirstVisit;
}
