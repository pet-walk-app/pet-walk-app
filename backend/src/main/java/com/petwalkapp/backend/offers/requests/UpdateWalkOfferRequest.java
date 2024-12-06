package com.petwalkapp.backend.offers.requests;

import com.petwalkapp.backend.common.validators.NotPastDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

  @NotNull
  @NotPastDate
  private LocalDate walkDate;

  @NotBlank
  private String description;

  @NotNull
  private Long walkLength;

  @NotNull
  private BigDecimal price;

  @NotBlank
  private String address;

  @NotBlank
  @Pattern(regexp = "^[0-9]{2}-[0-9]{3}$")
  private String zipCode;

  @NotBlank
  private String city;
}
