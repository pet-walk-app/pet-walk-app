package com.petwalkapp.backend.offers.services;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.common.requests.SortDirectionType;
import com.petwalkapp.backend.offers.dtos.WalkOfferAcceptedViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferPendingViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.SearchWalkOfferSortByType;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import jakarta.validation.Valid;

public interface IWalkOfferService
{

  PageDto<WalkOfferCreatorViewDto> getUserWalkOffers(Integer page, Integer pageSize);

  WalkOfferCreatorViewDto getUserWalkOffer(Long id);

  WalkOfferCreatorViewDto createWalkOffer(CreateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto updateUserWalkOffer(Long id,
      @Valid UpdateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto deleteUserWalkOffer(Long id);

  WalkOfferPendingViewDto getPendingOffer(Long offerId);

  WalkOfferAcceptedViewDto getAcceptedOffer(Long offerId);

  PageDto<WalkOfferPendingViewDto> getPendingOffers(Integer page, Integer pageSize);

  PageDto<WalkOfferAcceptedViewDto> getAcceptedOffers(Integer page, Integer pageSize);

  PageDto<WalkOfferSearchViewDto> searchWalkOffers(@Valid SearchWalkOffersRequest searchRequest,
      Integer page, Integer pageSize, SearchWalkOfferSortByType sortBy,
      SortDirectionType sortDirection);

  void applyForOffer(Long offerId);

  void removeApplicationForOffer(Long offerId);

  WalkOfferCreatorViewDto acceptApplication(Long offerId, Long applicationId);
}