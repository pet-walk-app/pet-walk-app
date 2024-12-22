package com.petwalkapp.backend.care;

import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.entities.WalkOfferApplication;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CaregiverUtils
{

  public static boolean didCaregiverAppliedForOffer(WalkOffer walkOffer, Caregiver currentCaregiver)
  {
    return Objects.nonNull(findMatchingOfferApplication(walkOffer, currentCaregiver));
  }

  public static boolean isApplicationRejected(WalkOffer walkOffer, Caregiver currentCaregiver)
  {
    WalkOfferApplication matchingOfferApplication = findMatchingOfferApplication(walkOffer,
        currentCaregiver);

    return Objects.nonNull(matchingOfferApplication) && matchingOfferApplication.isRejected();
  }

  public static WalkOfferApplication findMatchingOfferApplication(WalkOffer walkOffer,
      Caregiver currentCaregiver)
  {
    if (currentCaregiver == null) {
      return null;
    }

    return Optional.ofNullable(walkOffer.getWalkOfferApplications())
        .map(List::stream)
        .orElseGet(Stream::empty)
        .filter(
            walkOfferApplication -> walkOfferApplication.getCaregiver().equals(currentCaregiver))
        .findFirst()
        .orElse(null);
  }
}
