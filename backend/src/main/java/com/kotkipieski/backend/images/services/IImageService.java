package com.kotkipieski.backend.images.services;

import com.kotkipieski.backend.images.entities.Image;
import org.springframework.web.multipart.MultipartFile;

public interface IImageService
{

  void deleteImage(Image image);

  Image saveImage(MultipartFile imageFile);

  String getFullImageUrl(Image image);
}
