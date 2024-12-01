package com.kotkipieski.backend.care.services.impl;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.dtos.CaregiverSaveRequest;
import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.care.exceptions.CaregiverNotCreatedException;
import com.kotkipieski.backend.care.mappers.CaregiverResponseMapper;
import com.kotkipieski.backend.care.mappers.CaregiverSaveRequestMapper;
import com.kotkipieski.backend.care.repositories.CaregiverRepository;
import com.kotkipieski.backend.care.services.ICaregiverService;
import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class CaregiverService implements ICaregiverService
{

  private final CaregiverRepository caregiverRepository;
  private final CaregiverResponseMapper caregiverResponseMapper;
  private final CaregiverSaveRequestMapper caregiverSaveRequestMapper;
  private final IImageService imageService;
  private final IUserService userService;

  @Override
  public CaregiverResponse add(@Valid CaregiverSaveRequest caregiverSaveRequest)
  {
    User currentUser = userService.getCurrentUser();
    Caregiver caregiver = caregiverSaveRequestMapper.toCaregiver(caregiverSaveRequest);
    caregiver = caregiverRepository.save(caregiver);
    currentUser.setCaregiver(caregiver);
    userService.updateUser(currentUser);

    return caregiverResponseMapper.toCaregiverResponse(caregiver);
  }

  @Override
  public Caregiver save(Caregiver caregiver)
  {
    return caregiverRepository.save(caregiver);
  }

  @Override
  public void delete()
  {
    User currentUser = userService.getCurrentUser();
    Caregiver caregiver = currentUser.getCaregiver();

    if (Objects.nonNull(caregiver)) {
      Optional.ofNullable(caregiver.getImages())
          .orElseGet(Collections::emptyList)
          .forEach(imageService::deleteImage);

      caregiverRepository.delete(caregiver);
      currentUser.setCaregiver(null);
      userService.updateUser(currentUser);
    }
  }

  @Override
  public Caregiver getCurrentCaregiver()
  {
    User currentUser = userService.getCurrentUser();

    return Optional.ofNullable(currentUser.getCaregiver())
        .orElseThrow(CaregiverNotCreatedException::new);
  }
}
