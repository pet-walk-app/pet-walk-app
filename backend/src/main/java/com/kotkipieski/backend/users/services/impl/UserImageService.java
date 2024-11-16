package com.kotkipieski.backend.users.services.impl;

import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.users.dtos.UserResponse;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.mappers.UserResponseMapper;
import com.kotkipieski.backend.users.services.IUserImageService;
import com.kotkipieski.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class UserImageService implements IUserImageService
{

  private final IImageService imageService;
  private final IUserService userService;
  private final UserResponseMapper userDataMapper;

  @Override
  public UserResponse saveImage(MultipartFile imageFile)
  {
    User currentUser = userService.getCurrentUser();
    Image newImage = imageService.saveImage(imageFile);
    Optional.ofNullable(currentUser.getImage()).ifPresent(imageService::deleteImage);
    currentUser.setImage(newImage);
    userService.updateUser(currentUser);

    return userDataMapper.toUserDetails(currentUser, imageService);
  }

  @Override
  public void deleteImage()
  {
    User currentUser = userService.getCurrentUser();
    Image image = currentUser.getImage();

    if (Objects.nonNull(image)) {
      imageService.deleteImage(image);
      currentUser.setImage(null);
      userService.updateUser(currentUser);
    }
  }
}
