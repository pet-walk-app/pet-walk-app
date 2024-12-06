package com.petwalkapp.backend.care;

import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import java.util.Collection;
import java.util.Optional;

public class CaregiverUtils
{

  private CaregiverUtils()
  {
  }

  public static boolean didCaregiverAppliedForOffer(WalkOffer walkOffer, Caregiver currentCaregiver)
  {
    if (currentCaregiver == null) {
      return false;
    }

    return Optional.ofNullable(walkOffer.getWalkOfferApplications())
        .stream()
        .flatMap(Collection::stream)
        .anyMatch(
            application -> application.getCaregiver().getId().equals(currentCaregiver.getId()));
  }
}
