package com.petwalkapp.backend.users.services.impl;

import com.petwalkapp.backend.images.entities.Image;
import com.petwalkapp.backend.images.services.IImageService;
import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import com.petwalkapp.backend.users.entities.User;
import com.petwalkapp.backend.users.mappers.CurrentUserProfileDtoMapper;
import com.petwalkapp.backend.users.services.IUserImageService;
import com.petwalkapp.backend.users.services.IUserService;
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
  private final CurrentUserProfileDtoMapper userDataMapper;

  @Override
  public CurrentUserProfileDto saveImage(MultipartFile imageFile)
  {
    User currentUser = userService.getCurrentUser();
    Image newImage = imageService.saveImage(imageFile);
    Optional.ofNullable(currentUser.getImage()).ifPresent(imageService::deleteImage);
    currentUser.setImage(newImage);
    userService.updateUser(currentUser);

    return userDataMapper.toCurrentUserProfile(currentUser);
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
