package com.kotkipieski.backend.pets.services;

import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequestDto;
import com.kotkipieski.backend.pets.entities.Pet;
import com.kotkipieski.backend.pets.entities.PetOwner;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IPetService
{

  List<PetResponseDto> getUserPets();

  PetResponseDto addPet(@Valid PetSaveRequestDto petSaveRequestDto, MultipartFile image);

  PetResponseDto updatePet(Long petId, @Valid PetSaveRequestDto petSaveRequestDto,
      MultipartFile image);

  void deletePet(Long petId);

  PetResponseDto deletePetImage(Long petId);

  PetResponseDto updatePetImage(Long petId, MultipartFile image);

  PetResponseDto getPetById(Long petId);

  PetOwner getCurrentPetOwner();

  List<Pet> getPetByIds(List<Long> petIds);
}
