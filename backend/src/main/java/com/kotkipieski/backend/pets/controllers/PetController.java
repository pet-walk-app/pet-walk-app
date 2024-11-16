package com.kotkipieski.backend.pets.controllers;

import com.kotkipieski.backend.pets.dtos.PetDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequest;
import com.kotkipieski.backend.pets.services.IPetService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pet")
public class PetController
{

  private final IPetService petService;

  @PostMapping
  private ResponseEntity<PetDto> add(@Valid @RequestBody PetSaveRequest petSaveRequest,
      @RequestParam("petImages") List<MultipartFile> petImages)
  {
    return ResponseEntity.ok(petService.addPet(petSaveRequest, petImages));
  }
}
