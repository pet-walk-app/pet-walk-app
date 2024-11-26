package com.kotkipieski.backend.offers.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.pets.dtos.PetResponseDto;
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

  private String description;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate walkDate;

  private Long walkLength;

  private BigDecimal price;

  private String address;

  private String zipCode;

  private String city;

  private WalkOfferStatus status;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
