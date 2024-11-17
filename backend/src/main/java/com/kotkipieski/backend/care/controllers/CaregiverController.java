package com.kotkipieski.backend.care.controllers;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.dtos.CaregiverSaveRequest;
import com.kotkipieski.backend.care.services.ICaregiverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/caregiver")
public class CaregiverController
{

  private final ICaregiverService caregiverService;

  @PostMapping
  public CaregiverResponse save(@Valid @RequestBody CaregiverSaveRequest caregiverSaveRequest)
  {
    return caregiverService.add(caregiverSaveRequest);
  }

  @DeleteMapping
  public void delete()
  {
    caregiverService.delete();
  }
}
