package com.kotkipieski.backend.offers.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.users.dtos.UserProfileDto;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalkOfferCaregiverViewDto
{

  private Long id;

  private UserProfileDto userProfile;

  private List<PetResponseDto> pets;

  private String description;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate walkDate;

  private Long walkLength;

  private BigDecimal price;

  private WalkOfferStatus status;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
