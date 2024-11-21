package com.kotkipieski.backend.pets.services;

import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequestDto;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IPetService
{

  PetResponseDto addPet(@Valid PetSaveRequestDto petSaveRequestDto, MultipartFile image);

  PetResponseDto updatePet(Long petId, @Valid PetSaveRequestDto petSaveRequestDto,
      MultipartFile image);

  void deletePet(Long petId);

  List<PetResponseDto> getAllPets();

  PetResponseDto deletePetImage(Long petId);

  PetResponseDto updatePetImage(Long petId, MultipartFile image);

  PetResponseDto getPetById(Long petId);
}
