package com.kotkipieski.backend.pets.services.impl;

import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.pets.dtos.PetResponseDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequestDto;
import com.kotkipieski.backend.pets.entities.Pet;
import com.kotkipieski.backend.pets.entities.PetOwner;
import com.kotkipieski.backend.pets.exceptions.PetNotFoundException;
import com.kotkipieski.backend.pets.exceptions.PetOwnerNotCreatedException;
import com.kotkipieski.backend.pets.mappers.PetResponseDtoMapper;
import com.kotkipieski.backend.pets.mappers.PetSaveRequestDtoMapper;
import com.kotkipieski.backend.pets.repositories.PetOwnerRepository;
import com.kotkipieski.backend.pets.repositories.PetRepository;
import com.kotkipieski.backend.pets.services.IPetService;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService implements IPetService
{

  private final PetRepository petRepository;
  private final PetOwnerRepository petOwnerRepository;
  private final IUserService userService;
  private final IImageService imageService;
  private final PetSaveRequestDtoMapper petSaveRequestDtoMapper;
  private final PetResponseDtoMapper petResponseDtoMapper;

  @Override
  public PetResponseDto getPetById(Long petId)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    Pet pet = getUserPetById(petId, currentPetOwner.getPets());

    return petResponseDtoMapper.toDto(pet);
  }

  @Override
  public List<Pet> getPetByIds(List<Long> petIds)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    return Optional.ofNullable(petIds)
        .orElseGet(List::of)
        .stream()
        .map(petId -> getUserPetById(petId, currentPetOwner.getPets()))
        .toList();
  }

  @Override
  public List<PetResponseDto> getUserPets()
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();

    return currentPetOwner.getPets().stream().map(petResponseDtoMapper::toDto).toList();
  }

  @Override
  public PetResponseDto addPet(@Valid PetSaveRequestDto petSaveRequestDto, MultipartFile image)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    Pet pet = petRepository.save(petSaveRequestDtoMapper.toPet(petSaveRequestDto));
    Optional.ofNullable(image).map(imageService::saveImage).ifPresent(pet::setImage);

    currentPetOwner.getPets().add(pet);
    petOwnerRepository.save(currentPetOwner);

    return petResponseDtoMapper.toDto(pet);
  }

  @Override
  public PetResponseDto updatePet(Long petId, @Valid PetSaveRequestDto petSaveRequestDto,
      MultipartFile image)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    Pet petToUpdate = getUserPetById(petId, currentPetOwner.getPets());
    petSaveRequestDtoMapper.updatePetFromDto(petSaveRequestDto, petToUpdate);

    return updateImageIfPresentAndSave(image, petToUpdate);
  }

  @Override
  public void deletePet(Long petId)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    List<Pet> currentUserPets = currentPetOwner.getPets();
    Pet petToDelete = getUserPetById(petId, currentUserPets);

    currentUserPets.remove(petToDelete);
    petOwnerRepository.save(currentPetOwner);
  }

  @Override
  public PetResponseDto deletePetImage(Long petId)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    List<Pet> currentUserPets = currentPetOwner.getPets();
    Pet pet = getUserPetById(petId, currentUserPets);

    imageService.deleteImage(pet.getImage());
    pet.setImage(null);

    return petResponseDtoMapper.toDto(petRepository.save(pet));
  }

  @Override
  public PetResponseDto updatePetImage(Long petId, MultipartFile image)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    List<Pet> currentUserPets = currentPetOwner.getPets();
    Pet petToUpdate = getUserPetById(petId, currentUserPets);

    return updateImageIfPresentAndSave(image, petToUpdate);
  }

  @Override
  public PetOwner getCurrentPetOwner()
  {
    User currentUser = userService.getCurrentUser();
    return Optional.ofNullable(currentUser.getPetOwner())
        .orElseThrow(PetOwnerNotCreatedException::new);
  }

  private PetResponseDto updateImageIfPresentAndSave(MultipartFile image, Pet petToUpdate)
  {
    Optional.ofNullable(image).map(imageService::saveImage).ifPresent(newImage -> {
      Optional.ofNullable(petToUpdate.getImage()).ifPresent(imageService::deleteImage);

      petToUpdate.setImage(newImage);
    });

    Pet upatedPet = petRepository.save(petToUpdate);
    return petResponseDtoMapper.toDto(upatedPet);
  }

  private static Pet getUserPetById(Long petId, List<Pet> currentUserPets)
  {
    return currentUserPets.stream()
        .filter(pet -> pet.getId().equals(petId))
        .findFirst()
        .orElseThrow(PetNotFoundException::new);
  }

  private PetOwner getOrCreateCreatePetOwner()
  {
    User currentUser = userService.getCurrentUser();

    return Optional.ofNullable(currentUser.getPetOwner())
        .orElseGet(() -> createPetOwner(currentUser));
  }

  private PetOwner createPetOwner(User user)
  {
    PetOwner petOwner = petOwnerRepository.save(new PetOwner());
    user.setPetOwner(petOwner);
    userService.updateUser(user);

    return petOwner;
  }
}
