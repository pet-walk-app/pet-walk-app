package com.kotkipieski.backend.offers.mappers;

import com.kotkipieski.backend.offers.requests.CreateWalkOfferRequest;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.pets.services.IPetService;
import java.time.Instant;
import java.time.LocalDateTime;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(imports = {WalkOfferStatus.class, Instant.class, LocalDateTime.class})
public interface CreateWalkOfferRequestMapper
{

  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "status", expression = "java(WalkOfferStatus.OPEN)")
  @Mapping(target = "pets", expression = "java(petService.getPetByIds(request.getPetIds()))")
  @Mapping(target = "petOwner", expression = "java(petService.getCurrentPetOwner())")
  @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "careProposals", ignore = true)
  @Mapping(target = "selectedCaregiver", ignore = true)
  WalkOffer toWalkOffer(CreateWalkOfferRequest request, @Context IPetService petService);
}
