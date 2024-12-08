package com.petwalkapp.backend.care.services.impl;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.care.dtos.CaregiverSaveRequest;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.care.exceptions.CaregiverNotCreatedException;
import com.petwalkapp.backend.care.mappers.CaregiverResponseMapper;
import com.petwalkapp.backend.care.mappers.CaregiverSaveRequestMapper;
import com.petwalkapp.backend.care.repositories.CaregiverRepository;
import com.petwalkapp.backend.care.services.ICaregiverService;
import com.petwalkapp.backend.images.services.IImageService;
import com.petwalkapp.backend.users.entities.User;
import com.petwalkapp.backend.users.services.IUserService;
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
  public CaregiverResponse save(@Valid CaregiverSaveRequest caregiverSaveRequest)
  {
    User currentUser = userService.getCurrentUser();
    Caregiver currentCaregiver = currentUser.getCaregiver();

    Caregiver caregiverToSave;
    if (Objects.nonNull(currentCaregiver)) {
      caregiverSaveRequestMapper.updateCaregiver(caregiverSaveRequest, currentCaregiver);
      caregiverToSave = currentCaregiver;
    } else {
      caregiverToSave = caregiverSaveRequestMapper.toCaregiver(caregiverSaveRequest, currentUser);
    }

    caregiverToSave = caregiverRepository.save(caregiverToSave);
    currentUser.setCaregiver(caregiverToSave);
    userService.updateUser(currentUser);

    return caregiverResponseMapper.toCaregiverResponse(caregiverToSave);
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
  public Caregiver getCurrentCaregiverOrThrow() throws CaregiverNotCreatedException
  {
    User currentUser = userService.getCurrentUser();

    return Optional.ofNullable(currentUser.getCaregiver())
        .orElseThrow(CaregiverNotCreatedException::new);
  }

  @Override
  public Caregiver getCurrentCaregiver()
  {
    User currentUser = userService.getCurrentUser();

    return currentUser.getCaregiver();
  }

  @Override
  public Caregiver getCaregiverById(Long caregiverId)
  {
    return caregiverRepository.findById(caregiverId)
        .orElse(null);
  }

  @Override
  public CaregiverResponse getCurrentCaregiverResponse()
  {
    Caregiver caregiver = getCurrentCaregiver();
    return caregiverResponseMapper.toCaregiverResponse(caregiver);
  }
}
