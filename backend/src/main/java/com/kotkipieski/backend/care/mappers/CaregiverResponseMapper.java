package com.kotkipieski.backend.care.mappers;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.images.mappers.ImageMapper;
import com.kotkipieski.backend.images.services.IImageService;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(uses = ImageMapper.class)
public interface CaregiverResponseMapper
{

  CaregiverResponse toCaregiverResponse(Caregiver caregiverDto,
      @Context IImageService imageService);
}
