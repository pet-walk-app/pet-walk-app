package com.petwalkapp.backend.care.controllers;

import com.petwalkapp.backend.care.dtos.CaregiverResponse;
import com.petwalkapp.backend.care.dtos.CaregiverSaveRequest;
import com.petwalkapp.backend.care.services.ICaregiverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @GetMapping
  public CaregiverResponse get()
  {
    return caregiverService.getCurrentCaregiverResponse();
  }

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
