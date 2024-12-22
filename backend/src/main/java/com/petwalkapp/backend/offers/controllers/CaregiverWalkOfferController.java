package com.petwalkapp.backend.offers.controllers;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferAcceptedViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferPendingViewDto;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/caregiver/offers")
public class CaregiverWalkOfferController
{

  private final IWalkOfferService walkOfferService;

  @GetMapping
  public ResponseEntity<PageDto<WalkOfferAcceptedViewDto>> displayAcceptedOffers(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize,
      @RequestHeader(name = "latitude", required = false) Double latitude,
      @RequestHeader(name = "longitude", required = false) Double longitude
  )
  {
    return ResponseEntity.ok(
        walkOfferService.getAcceptedOffers(page, pageSize, latitude, longitude));
  }

  @GetMapping("/{id}")
  public ResponseEntity<WalkOfferAcceptedViewDto> displayAcceptedOffer(
      @PathVariable("id") Long offerId,
      @RequestHeader(name = "latitude", required = false) Double latitude,
      @RequestHeader(name = "longitude", required = false) Double longitude)
  {
    return ResponseEntity.ok(walkOfferService.getAcceptedOffer(offerId, latitude, longitude));
  }

  @GetMapping("/pending")
  public ResponseEntity<PageDto<WalkOfferPendingViewDto>> displayPendingOffers(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize,
      @RequestHeader(name = "latitude", required = false) Double latitude,
      @RequestHeader(name = "longitude", required = false) Double longitude
  )
  {
    return ResponseEntity.ok(
        walkOfferService.getPendingOffers(page, pageSize, latitude, longitude));
  }

  @GetMapping("/pending/{id}")
  public ResponseEntity<WalkOfferPendingViewDto> displayPendingOffer(
      @PathVariable("id") Long offerId,
      @RequestHeader(name = "latitude", required = false) Double latitude,
      @RequestHeader(name = "longitude", required = false) Double longitude
  )
  {
    return ResponseEntity.ok(walkOfferService.getPendingOffer(offerId, latitude, longitude));
  }

  @GetMapping("/apply/{id}")
  public void applyToOffer(@PathVariable("id") Long offerId)
  {
    walkOfferService.applyForOffer(offerId);
  }

  @DeleteMapping("/apply/{id}")
  public void deleteApplication(@PathVariable("id") Long offerId)
  {
    walkOfferService.removeApplicationForOffer(offerId);
  }
}
