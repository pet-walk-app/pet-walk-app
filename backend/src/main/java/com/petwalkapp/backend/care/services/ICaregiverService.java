package com.petwalkapp.backend.care.services;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.care.dtos.CaregiverSaveRequest;
import com.petwalkapp.backend.care.entities.Caregiver;
import jakarta.validation.Valid;

public interface ICaregiverService
{

  CaregiverResponse add(@Valid CaregiverSaveRequest caregiverSaveRequest);

  Caregiver save(Caregiver caregiver);

  void delete();

  Caregiver getCurrentCaregiverOrThrow();

  Caregiver getCurrentCaregiver();

  Caregiver getCaregiverById(Long caregiverId);
}
