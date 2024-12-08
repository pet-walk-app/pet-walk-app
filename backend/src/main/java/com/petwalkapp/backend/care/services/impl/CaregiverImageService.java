package com.petwalkapp.backend.care.services.impl;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.care.mappers.CaregiverResponseMapper;
import com.petwalkapp.backend.care.services.ICaregiverImageService;
import com.petwalkapp.backend.care.services.ICaregiverService;
import com.petwalkapp.backend.images.entities.Image;
import com.petwalkapp.backend.images.services.IImageService;
import com.petwalkapp.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class CaregiverImageService implements ICaregiverImageService
{

  private final IImageService imageService;
  private final IUserService userService;
  private final ICaregiverService caregiverService;
  private final CaregiverResponseMapper caregiverResponseMapper;

  @Override
  public CaregiverResponse saveImages(@NotNull List<MultipartFile> imageFiles)
  {
    Caregiver currentCaregiver = caregiverService.getCurrentCaregiverOrThrow();

    List<Image> newImages = imageFiles.stream().map(imageService::saveImage).toList();

    currentCaregiver.getImages().addAll(newImages);

    caregiverService.save(currentCaregiver);

    return caregiverResponseMapper.toCaregiverResponse(currentCaregiver);
  }

  @Override
  public void deleteImage(Long id)
  {
    if (Objects.isNull(id)) {
      return;
    }

    Caregiver currentCaregiver = caregiverService.getCurrentCaregiverOrThrow();
    List<Image> images = Optional.of(currentCaregiver)
        .map(Caregiver::getImages)
        .orElseGet(Collections::emptyList);

    Image image = images.stream().filter(im -> id.equals(im.getId())).findFirst().orElse(null);

    if (Objects.nonNull(image)) {
      imageService.deleteImage(image);
      images.remove(image);

      currentCaregiver.setImages(images);
      caregiverService.save(currentCaregiver);
    }
  }

  @Override
  public void deleteAllImages()
  {
    Caregiver currentCaregiver = caregiverService.getCurrentCaregiverOrThrow();
    List<Image> images = Optional.of(currentCaregiver)
        .map(Caregiver::getImages)
        .orElseGet(Collections::emptyList);

    images.forEach(imageService::deleteImage);
    images.clear();

    currentCaregiver.setImages(images);
    caregiverService.save(currentCaregiver);
  }
}
