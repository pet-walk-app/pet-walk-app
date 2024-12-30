package com.petwalkapp.backend.offers.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.petwalkapp.backend.offers.entities.WalkOfferStatus;
import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.users.dtos.UserCaregiverProfileDto;
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
public class WalkOfferCreatorViewDto
{

  private Long id;

  private List<PetResponseDto> pets;

  private UserCaregiverProfileDto selectedCaregiver;

  private String description;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate walkDate;

  private Long walkLength;

  private BigDecimal price;

  private String address;

  private String zipCode;

  private String city;

  private List<WalkOfferApplicationDto> applications;

  private WalkOfferStatus status;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private double latitude;

  private double longitude;
}
