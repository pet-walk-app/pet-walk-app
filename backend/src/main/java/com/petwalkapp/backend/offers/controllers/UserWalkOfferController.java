package com.petwalkapp.backend.offers.controllers;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/offers")
public class UserWalkOfferController
{

  private final IWalkOfferService walkOfferService;

  @PostMapping
  public ResponseEntity<WalkOfferCreatorViewDto> createWalkOffer(
      @RequestBody @Valid CreateWalkOfferRequest createWalkOfferRequest)
  {
    return ResponseEntity.ok(walkOfferService.createWalkOffer(createWalkOfferRequest));
  }

  @GetMapping
  public ResponseEntity<PageDto<WalkOfferCreatorViewDto>> getUserWalkOffers(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "page_size", required = false, defaultValue = "10") Integer pageSize)
  {
    return ResponseEntity.ok(walkOfferService.getUserWalkOffers(page, pageSize));
  }

  @GetMapping("/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> getUserWalkOffer(@PathVariable("id") Long id)
  {
    return ResponseEntity.ok(walkOfferService.getUserWalkOffer(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> updateUserWalkOffer(@PathVariable("id") Long id,
      @RequestBody @Valid UpdateWalkOfferRequest updateWalkOfferRequest)
  {
    return ResponseEntity.ok(walkOfferService.updateUserWalkOffer(id, updateWalkOfferRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> deleteWalkOffer(@PathVariable("id") Long id)
  {
    return ResponseEntity.ok(walkOfferService.deleteUserWalkOffer(id));
  }

  @GetMapping("/accept/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> acceptApplication(@PathVariable("id") Long offerId,
      @RequestParam("applicationId") Long applicationId)
  {
    return ResponseEntity.ok(walkOfferService.acceptApplication(offerId, applicationId));
  }

  @DeleteMapping("/accept/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> undoAcceptApplication(
      @PathVariable("id") Long offerId)
  {
    return ResponseEntity.ok(walkOfferService.undoAcceptApplication(offerId));
  }

  @GetMapping("/reject/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> rejectApplication(@PathVariable("id") Long offerId,
      @RequestParam("applicationId") Long applicationId)
  {
    return ResponseEntity.ok(walkOfferService.rejectApplication(offerId, applicationId));
  }

  @DeleteMapping("/reject/{id}")
  public ResponseEntity<WalkOfferCreatorViewDto> undoRejectApplication(
      @PathVariable("id") Long offerId,
      @RequestParam("applicationId") Long applicationId)
  {
    return ResponseEntity.ok(walkOfferService.undoRejectApplication(offerId, applicationId));
  }
}
