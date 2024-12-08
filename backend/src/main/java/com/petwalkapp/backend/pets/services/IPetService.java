package com.petwalkapp.backend.pets.services;

import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.pets.dtos.PetSaveRequestDto;
import com.petwalkapp.backend.pets.entities.Pet;
import com.petwalkapp.backend.pets.entities.PetOwner;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IPetService
{

  List<PetResponseDto> getUserPets();

  PetResponseDto addPet(@Valid PetSaveRequestDto petSaveRequestDto);

  PetResponseDto updatePet(Long petId, @Valid PetSaveRequestDto petSaveRequestDto);

  void deletePet(Long petId);

  PetResponseDto deletePetImage(Long petId);

  PetResponseDto updatePetImage(Long petId, MultipartFile image);

  PetResponseDto getUserPetById(Long petId);

  PetOwner getCurrentPetOwner();

  PetOwner getCurrentPetOwnerOrThrow();

  List<Pet> getUserPetsByIds(List<Long> petIds);
}
