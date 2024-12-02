package com.petwalkapp.backend.offers.controllers;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/offers/search")
public class SearchWalkOfferController
{

  private final IWalkOfferService walkOfferService;

  @PostMapping
  public ResponseEntity<PageDto<WalkOfferSearchViewDto>> searchWalkOffers(
      @Valid @RequestBody SearchWalkOffersRequest searchRequest)
  {
    return ResponseEntity.ok(walkOfferService.searchWalkOffers(searchRequest));
  }
}
