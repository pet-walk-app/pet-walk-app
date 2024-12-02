package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.entities.WalkOfferStatus;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.pets.services.IPetService;
import java.time.Instant;
import java.time.LocalDateTime;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {WalkOfferStatus.class, Instant.class, LocalDateTime.class}, uses = {
    ZipCodeMapper.class})
public abstract class CreateWalkOfferRequestMapper
{

  @Autowired
  protected IPetService petService;

  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "status", expression = "java(WalkOfferStatus.OPEN)")
  @Mapping(target = "pets", expression = "java(petService.getPetByIds(request.getPetIds()))")
  @Mapping(target = "petOwner", expression = "java(petService.getCurrentPetOwner())")
  @Mapping(target = "zipCodeLocation", source = "zipCode")
  @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "careProposals", ignore = true)
  @Mapping(target = "selectedCaregiver", ignore = true)
  public abstract WalkOffer toWalkOffer(CreateWalkOfferRequest request);
}
