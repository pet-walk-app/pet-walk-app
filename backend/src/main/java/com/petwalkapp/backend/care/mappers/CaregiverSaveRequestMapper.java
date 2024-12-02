package com.petwalkapp.backend.care.mappers;

import com.petwalkapp.backend.care.dtos.CaregiverSaveRequest;
import com.petwalkapp.backend.care.entities.Caregiver;
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
