package com.petwalkapp.backend.offers.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.petwalkapp.backend.offers.entities.WalkOfferStatus;
import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.users.dtos.UserOfferSearchDto;
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
public class WalkOfferPendingViewDto
{

  private Long id;

  private List<PetResponseDto> pets;

  private String description;

  private UserOfferSearchDto offerCreator;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate walkDate;

  private Long walkLength;

  private BigDecimal price;

  private Double distance;

  private String city;

  private boolean alreadyApplied;

  private WalkOfferStatus status;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
