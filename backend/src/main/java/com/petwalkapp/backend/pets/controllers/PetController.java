package com.petwalkapp.backend.pets.controllers;

import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.pets.dtos.PetSaveRequestDto;
import com.petwalkapp.backend.pets.services.IPetService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pets")
public class PetController
{

  private final IPetService petService;

  @GetMapping
  public ResponseEntity<List<PetResponseDto>> getUserPets()
  {
    return ResponseEntity.ok(petService.getUserPets());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PetResponseDto> getPetById(@PathVariable("id") Long petId)
  {
    return ResponseEntity.ok(petService.getUserPetById(petId));
  }

  @PostMapping
  public ResponseEntity<PetResponseDto> add(
      @RequestBody @Valid PetSaveRequestDto petRequestDto)
  {
    return ResponseEntity.ok(petService.addPet(petRequestDto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PetResponseDto> update(@PathVariable("id") Long id,
      @RequestBody @Valid PetSaveRequestDto petRequestDto)
  {
    return ResponseEntity.ok(petService.updatePet(id, petRequestDto));
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