package com.kotkipieski.backend.care.mappers;

import com.kotkipieski.backend.care.dtos.CaregiverSaveRequest;
import com.kotkipieski.backend.care.entities.Caregiver;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CaregiverSaveRequestMapper
{

  @Mapping(target = "proposals", ignore = true)
  @Mapping(target = "acceptedOffers", ignore = true)
  @Mapping(target = "images", ignore = true)
  Caregiver toCaregiver(CaregiverSaveRequest caregiver);
}
