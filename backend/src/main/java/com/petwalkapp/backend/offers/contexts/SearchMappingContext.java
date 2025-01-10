package com.petwalkapp.backend.offers.contexts;

import com.petwalkapp.backend.care.entities.Caregiver;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchMappingContext
{

  private Caregiver currentCaregiver;
  private Double latitude;
  private Double longitude;
}
