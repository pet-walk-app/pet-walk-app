package com.kotkipieski.backend.offers.services;

import com.kotkipieski.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.kotkipieski.backend.offers.dtos.WalkOfferSearchViewDto;
import com.kotkipieski.backend.offers.requests.CreateWalkOfferRequest;
import com.kotkipieski.backend.offers.requests.SearchWalkOffersRequest;
import com.kotkipieski.backend.offers.requests.UpdateWalkOfferRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;

public interface IWalkOfferService
{

  List<WalkOfferCreatorViewDto> getUserWalkOffers();

  WalkOfferCreatorViewDto getUserWalkOffer(Long id);

  WalkOfferCreatorViewDto createWalkOffer(CreateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto updateUserWalkOffer(Long id,
      @Valid UpdateWalkOfferRequest createWalkOfferRequest);

  WalkOfferCreatorViewDto deleteUserWalkOffer(Long id);

  Page<WalkOfferSearchViewDto> searchWalkOffers(SearchWalkOffersRequest request, int page, int size,
      String sortBy, String sortDirection);
}
