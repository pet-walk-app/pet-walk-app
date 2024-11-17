package com.kotkipieski.backend.pets.controllers;

import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequestDto;
import com.kotkipieski.backend.pets.services.IPetService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pet")
public class PetController
{

  private final IPetService petService;

  @GetMapping
  public ResponseEntity<List<PetResponseDto>> getAllPets()
  {
    return ResponseEntity.ok(petService.getAllPets());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PetResponseDto> getPetById(@PathVariable("id") Long petId)
  {
    return ResponseEntity.ok(petService.getPetById(petId));
  }

  @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public ResponseEntity<PetResponseDto> add(
      @RequestPart(value = "pet", required = true) @Valid PetSaveRequestDto petRequestDto,
      @RequestPart(value = "image", required = false) MultipartFile image)
  {
    return ResponseEntity.ok(petService.addPet(petRequestDto, image));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PetResponseDto> update(@PathVariable("id") Long id,
      @RequestPart(value = "pet", required = true) @Valid PetSaveRequestDto petRequestDto,
      @RequestPart(value = "image", required = false) MultipartFile image)
  {
    return ResponseEntity.ok(petService.updatePet(id, petRequestDto, image));
  }

  @PutMapping(value = "/{id}/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public ResponseEntity<PetResponseDto> addImage(@PathVariable("id") Long petId,
      @RequestPart(value = "image", required = true) MultipartFile image)
  {
    return ResponseEntity.ok(petService.updatePetImage(petId, image));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable("id") Long petId)
  {
    petService.deletePet(petId);

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}/image")
  public ResponseEntity<PetResponseDto> deleteImage(@PathVariable("id") Long petId)
  {
    return ResponseEntity.ok(petService.deletePetImage(petId));
  }
}