package com.kotkipieski.backend.care.mappers;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.images.mappers.ImageMapper;
import org.mapstruct.Mapper;

@Mapper(uses = ImageMapper.class)
public abstract class CaregiverResponseMapper
{

  public abstract CaregiverResponse toCaregiverResponse(Caregiver caregiverDto);
}
