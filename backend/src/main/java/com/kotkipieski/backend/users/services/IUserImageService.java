package com.kotkipieski.backend.users.services;

import com.kotkipieski.backend.users.dtos.UserResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IUserImageService
{

  UserResponse saveImage(MultipartFile imageFile);

  void deleteImage();
}
