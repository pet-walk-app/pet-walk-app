package com.petwalkapp.backend.offers.dtos;

import com.petwalkapp.backend.users.dtos.UserCaregiverProfileDto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalkOfferApplicationDto
{

  private Long id;
  private UserCaregiverProfileDto caregiver;
  private LocalDateTime applicationDate;
}
