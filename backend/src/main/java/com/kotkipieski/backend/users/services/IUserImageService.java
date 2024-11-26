package com.kotkipieski.backend.users.services;

import com.kotkipieski.backend.users.dtos.CurrentUserProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface IUserImageService
{

  CurrentUserProfileDto saveImage(MultipartFile imageFile);

  void deleteImage();
}
