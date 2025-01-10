package com.petwalkapp.backend.offers.controllers;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.common.requests.SortDirectionType;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.requests.SearchWalkOfferSortByType;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/offers/search")
public class SearchWalkOfferController
{

  private final IWalkOfferService walkOfferService;

  @PostMapping
  public ResponseEntity<PageDto<WalkOfferSearchViewDto>> searchWalkOffers(
      @RequestBody(required = false) SearchWalkOffersRequest searchRequest,
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize,
      @RequestParam(name = "sort_by", required = false) SearchWalkOfferSortByType sortBy,
      @RequestParam(name = "sort_direction", required = false) SortDirectionType sortDirection,
      @RequestHeader(name = "latitude") Double latitude,
      @RequestHeader(name = "longitude") Double longitude)
  {
    return ResponseEntity.ok(
        walkOfferService.searchWalkOffers(searchRequest, page, pageSize, sortBy, sortDirection,
            latitude, longitude));
  }
}
