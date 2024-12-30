package com.petwalkapp.backend.offers.mappers;

import com.petwalkapp.backend.care.CaregiverUtils;
import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.common.utils.DistanceCalculator;
import com.petwalkapp.backend.offers.contexts.SearchMappingContext;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.users.mappers.UserOfferSearchDtoMapper;
import org.locationtech.jts.geom.Point;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(uses = {UserOfferSearchDtoMapper.class, PetResponseDtoMapper.class}, imports = {
    CaregiverUtils.class})
public interface WalkOfferSearchViewDtoMapper
{

  @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
  PageDto<WalkOfferSearchViewDto> toPageDto(Page<WalkOffer> walkOffers,
      @Context SearchMappingContext context);

  @Mapping(target = "alreadyApplied", expression = "java(CaregiverUtils.didCaregiverAppliedForOffer(walkOffer, context.getCurrentCaregiver()))")
  @Mapping(target = "isApplicationRejected", expression = "java(CaregiverUtils.isApplicationRejected(walkOffer, context.getCurrentCaregiver()))")
  @Mapping(target = "distance", expression = "java(calculationDistance(walkOffer, context))")
  @Mapping(target = "offerCreator", source = "walkOffer.petOwner.user")
  WalkOfferSearchViewDto toDto(WalkOffer walkOffer, @Context SearchMappingContext context);

  default Double calculationDistance(WalkOffer walkOffer, SearchMappingContext context)
  {
    if (context.getLatitude() == null || context.getLongitude() == null) {
      return null;
    }

    Point location = walkOffer.getLocation();

    return DistanceCalculator.calculateDistance(location.getY(), location.getX(),
        context.getLatitude(), context.getLongitude());
  }
}
