package com.petwalkapp.backend.images.services;

import com.petwalkapp.backend.images.entities.Image;
import org.springframework.web.multipart.MultipartFile;

public interface IImageService
{

  void deleteImage(Image image);

  Image saveImage(MultipartFile imageFile);

  String getFullImageUrl(Image image);
}
