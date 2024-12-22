package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.mappers.PetOwnerResponseDtoMapper;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.mappers.UserProfileDtoMapper;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(uses = {PetOwnerResponseDtoMapper.class, PetResponseDtoMapper.class,
    UserProfileDtoMapper.class, WalkOfferApplicationDtoMapper.class})
public interface WalkOfferCreatorViewDtoMapper
{

  @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
  PageDto<WalkOfferCreatorViewDto> toPageDto(Page<WalkOffer> walkOffers);

  @Mapping(target = "longitude", expression = "java(walkOffer.getZipCodeLocation().getX())")
  @Mapping(target = "latitude", expression = "java(walkOffer.getZipCodeLocation().getY())")
  @Mapping(target = "applications", source = "walkOffer.walkOfferApplications")
  @Mapping(target = "selectedCaregiver", source = "walkOffer.selectedCaregiver.user")
  WalkOfferCreatorViewDto toDto(WalkOffer walkOffer);
}
