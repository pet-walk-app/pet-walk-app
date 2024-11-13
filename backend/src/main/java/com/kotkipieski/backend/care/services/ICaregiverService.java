package com.kotkipieski.backend.care.services;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.dtos.CaregiverSaveRequest;
import com.kotkipieski.backend.care.entities.Caregiver;
import jakarta.validation.Valid;

public interface ICaregiverService
{

  CaregiverResponse add(@Valid CaregiverSaveRequest caregiverSaveRequest);

  Caregiver save(Caregiver caregiver);

  void delete();

  Caregiver getCurrentCaregiver();
}
