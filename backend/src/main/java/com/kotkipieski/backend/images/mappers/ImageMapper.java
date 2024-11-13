package com.kotkipieski.backend.images.mappers;

import com.kotkipieski.backend.images.dtos.ImageResponse;
import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.images.services.IImageService;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ImageMapper
{

  @Mapping(target = "url", expression = "java(imageService.getFullImageUrl(image))")
  ImageResponse toImageResponse(Image image, @Context IImageService imageService);
}
