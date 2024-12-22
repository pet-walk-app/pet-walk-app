package com.petwalkapp.backend.offers.requests;

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

  private Double radius;

  private BigDecimal priceFrom;

  private BigDecimal priceTo;

  private LocalDate walkDateFrom;

  private LocalDate walkDateTo;

  private Double minTime;

  private Double maxTime;
}
