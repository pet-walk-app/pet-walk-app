package com.petwalkapp.backend.offers.controllers;

import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
  public ResponseEntity<List<WalkOfferCreatorViewDto>> getUserWalkOffers()
  {
    return ResponseEntity.ok(walkOfferService.getUserWalkOffers());
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
  public ResponseEntity<WalkOfferCreatorViewDto> updateUserWalkOffer(@PathVariable("id") Long id)
  {
    return ResponseEntity.ok(walkOfferService.deleteUserWalkOffer(id));
  }
}
