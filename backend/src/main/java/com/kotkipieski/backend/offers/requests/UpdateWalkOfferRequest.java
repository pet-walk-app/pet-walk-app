package com.kotkipieski.backend.offers.requests;

import com.kotkipieski.backend.common.connectors.zippopotamus.validators.ValidZipCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateWalkOfferRequest
{

  @NotEmpty
  private List<Long> petIds;

  @NotNull private LocalDate walkDate;

  @NotBlank
  private String description;

  @NotNull private Long walkLength;

  @NotNull private BigDecimal price;

  @NotBlank
  private String address;

  @ValidZipCode
  private String zipCode;

  @NotBlank
  private String city;
}
