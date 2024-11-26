package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.offers.requests.UpdateWalkOfferRequest;
import com.kotkipieski.backend.pets.services.IPetService;
import java.time.Instant;
import java.time.LocalDateTime;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(imports = {WalkOfferStatus.class, Instant.class, LocalDateTime.class})
public interface UpdateWalkOfferRequestMapper
{

  @Mapping(target = "updatedAt", expression = "java(LocalDateTime.now())")
  void updateWalkOfferFromDto(UpdateWalkOfferRequest updateWalkOfferRequest,
      @MappingTarget WalkOffer walkOffer, @Context IPetService petService);
}
