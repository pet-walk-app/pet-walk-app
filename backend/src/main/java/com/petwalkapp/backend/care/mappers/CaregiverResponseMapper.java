package com.petwalkapp.backend.care.mappers;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.images.mappers.ImageMapper;
import org.mapstruct.Mapper;

@Mapper(uses = ImageMapper.class)
public abstract class CaregiverResponseMapper
{

  public abstract CaregiverResponse toCaregiverResponse(Caregiver caregiverDto);
}
