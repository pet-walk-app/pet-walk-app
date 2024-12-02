package com.petwalkapp.backend.users.services;

import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface IUserImageService
{

  CurrentUserProfileDto saveImage(MultipartFile imageFile);

  void deleteImage();
}
