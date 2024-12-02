package com.petwalkapp.backend.users.controllers;

import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import com.petwalkapp.backend.users.services.IUserImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/image")
public class UserImageController
{

  private final IUserImageService userImageService;

  @PostMapping
  public ResponseEntity<CurrentUserProfileDto> saveImage(@RequestParam("file") MultipartFile file)
  {
    return ResponseEntity.ok(userImageService.saveImage(file));
  }

  @DeleteMapping
  public void deleteImage()
  {
    userImageService.deleteImage();
  }
}
