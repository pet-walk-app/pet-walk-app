package com.kotkipieski.backend.offers.requests;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchWalkOffersRequest
{

  @NotBlank
  private double longitude;

  @NotBlank
  private double latitude;

  @NotBlank
  private double radius;

  private BigDecimal priceFrom;

  private BigDecimal priceTo;

  private LocalDate walkDateStartLimit;

  private LocalDate walkDateEndLimit;

  private Double minTime;

  private Double maxTime;
}
