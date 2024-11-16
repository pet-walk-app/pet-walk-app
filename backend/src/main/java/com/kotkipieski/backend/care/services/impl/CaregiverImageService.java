package com.kotkipieski.backend.care.services.impl;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.care.mappers.CaregiverResponseMapper;
import com.kotkipieski.backend.care.services.ICaregiverImageService;
import com.kotkipieski.backend.care.services.ICaregiverService;
import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.users.services.IUserService;
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
    Caregiver currentCaregiver = caregiverService.getCurrentCaregiver();

    List<Image> newImages = imageFiles.stream().map(imageService::saveImage).toList();

    currentCaregiver.getImages().addAll(newImages);

    caregiverService.save(currentCaregiver);

    return caregiverResponseMapper.toCaregiverResponse(currentCaregiver, imageService);
  }

  @Override
  public void deleteImage(Long id)
  {
    if (Objects.isNull(id)) {
      return;
    }

    Caregiver currentCaregiver = caregiverService.getCurrentCaregiver();
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
}
