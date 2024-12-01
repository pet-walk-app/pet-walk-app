package com.kotkipieski.backend.images.mappers;

import com.kotkipieski.backend.images.dtos.ImageResponse;
import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.images.services.IImageService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public abstract class ImageMapper
{

  @Autowired
  protected IImageService imageService;

  @Mapping(target = "url", expression = "java(imageService.getFullImageUrl(image))")
  public abstract ImageResponse toImageResponse(Image image);

  public String toImageUrl(Image image)
  {
    return imageService.getFullImageUrl(image);
  }
}
