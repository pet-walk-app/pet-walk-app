package com.kotkipieski.backend.offers.controllers;

import com.kotkipieski.backend.offers.dtos.WalkOfferSearchViewDto;
import com.kotkipieski.backend.offers.requests.SearchWalkOffersRequest;
import com.kotkipieski.backend.offers.services.IWalkOfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/offers/search")
public class SearchWalkOfferController
{

  private final IWalkOfferService walkOfferService;

  @GetMapping
  public ResponseEntity<Page<WalkOfferSearchViewDto>> searchWalkOffers(
      @Valid @RequestBody SearchWalkOffersRequest searchRequest)
  {
    return ResponseEntity.ok(walkOfferService.searchWalkOffers(searchRequest));
  }
}
