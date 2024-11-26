package com.kotkipieski.backend.offers.services;

import com.kotkipieski.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.kotkipieski.backend.offers.requests.CreateWalkOfferRequest;
import com.kotkipieski.backend.offers.requests.UpdateWalkOfferRequest;
import jakarta.validation.Valid;
import java.util.List;

public interface IWalkOfferService
{

  List<WalkOfferCreatorViewDto> getUserWalkOffers();

  WalkOfferCreatorViewDto getUserWalkOffer(Long id);

  WalkOfferCreatorViewDto createWalkOffer(CreateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto updateUserWalkOffer(Long id,
      @Valid UpdateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto deleteUserWalkOffer(Long id);
}
