package com.petwalkapp.backend.offers.services;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
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

  PageDto<WalkOfferSearchViewDto> searchWalkOffers(SearchWalkOffersRequest request);
}
