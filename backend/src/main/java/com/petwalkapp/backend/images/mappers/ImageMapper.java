package com.petwalkapp.backend.images.mappers;

import com.petwalkapp.backend.images.dtos.ImageResponse;
import com.petwalkapp.backend.images.entities.Image;
import com.petwalkapp.backend.images.services.IImageService;
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
