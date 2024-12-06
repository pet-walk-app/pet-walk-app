package com.petwalkapp.backend.care.mappers;

import com.petwalkapp.backend.care.dtos.CaregiverSaveRequest;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.users.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CaregiverSaveRequestMapper
{

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "images", ignore = true)
  @Mapping(target = "user", expression = "java(user)")
  Caregiver toCaregiver(CaregiverSaveRequest caregiver, @Context User user);
}
