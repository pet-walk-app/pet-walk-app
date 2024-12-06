package com.petwalkapp.backend.pets.services.impl;

import com.petwalkapp.backend.images.services.IImageService;
import com.petwalkapp.backend.pets.dtos.PetResponseDto;
import com.petwalkapp.backend.pets.dtos.PetSaveRequestDto;
import com.petwalkapp.backend.pets.entities.Pet;
import com.petwalkapp.backend.pets.entities.PetOwner;
import com.petwalkapp.backend.pets.exceptions.PetNotFoundException;
import com.petwalkapp.backend.pets.exceptions.PetOwnerNotCreatedException;
import com.petwalkapp.backend.pets.mappers.PetResponseDtoMapper;
import com.petwalkapp.backend.pets.mappers.PetSaveRequestDtoMapper;
import com.petwalkapp.backend.pets.repositories.PetOwnerRepository;
import com.petwalkapp.backend.pets.repositories.PetRepository;
import com.petwalkapp.backend.pets.services.IPetService;
import com.petwalkapp.backend.security.exceptions.NotAllowedException;
import com.petwalkapp.backend.users.entities.User;
import com.petwalkapp.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
  public PetResponseDto getUserPetById(Long petId)
  {
    Pet pet = getUserPetByIdOrThrow(petId);

    return petResponseDtoMapper.toDto(pet);
  }

  @Override
  public List<Pet> getUserPetsByIds(List<Long> petIds)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    List<Pet> matchingPets = petRepository.getPetsByIdInAndOwner(petIds, currentPetOwner);

    if (matchingPets.size() != petIds.size()) {
      throw new PetNotFoundException();
    }

    return matchingPets;
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

    if (Objects.isNull(currentPetOwner.getPets())) {
      currentPetOwner.setPets(new ArrayList<>());
    }

    currentPetOwner.getPets().add(pet);
    petOwnerRepository.save(currentPetOwner);

    return petResponseDtoMapper.toDto(pet);
  }

  @Override
  public PetResponseDto updatePet(Long petId, @Valid PetSaveRequestDto petSaveRequestDto,
      MultipartFile image)
  {
    Pet petToUpdate = getUserPetByIdOrThrow(petId);
    petSaveRequestDtoMapper.updatePetFromDto(petSaveRequestDto, petToUpdate);

    return updateImageIfPresentAndSave(image, petToUpdate);
  }

  @Override
  public void deletePet(Long petId)
  {
    Pet petToDelete = getUserPetByIdOrThrow(petId);

    petRepository.delete(petToDelete);
  }

  @Override
  public PetResponseDto deletePetImage(Long petId)
  {
    Pet pet = getUserPetByIdOrThrow(petId);

    imageService.deleteImage(pet.getImage());
    pet.setImage(null);

    return petResponseDtoMapper.toDto(petRepository.save(pet));
  }

  @Override
  public PetResponseDto updatePetImage(Long petId, MultipartFile image)
  {
    Pet petToUpdate = getUserPetByIdOrThrow(petId);

    return updateImageIfPresentAndSave(image, petToUpdate);
  }

  @Override
  public PetOwner getCurrentPetOwner()
  {
    User currentUser = userService.getCurrentUser();
    return currentUser.getPetOwner();
  }

  @Override
  public PetOwner getCurrentPetOwnerOrThrow()
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

  private Pet getUserPetByIdOrThrow(Long petId)
  {
    Pet pet = petRepository.getPetById(petId).orElseThrow(PetNotFoundException::new);

    if (!pet.getOwner().getId().equals(getOrCreateCreatePetOwner().getId())) {
      throw new NotAllowedException();
    }

    return pet;
  }

  private PetOwner getOrCreateCreatePetOwner()
  {
    User currentUser = userService.getCurrentUser();

    return Optional.ofNullable(currentUser.getPetOwner())
        .orElseGet(() -> createPetOwner(currentUser));
  }

  private PetOwner createPetOwner(User user)
  {
    PetOwner petOwner = petOwnerRepository.save(PetOwner.builder().user(user).build());
    user.setPetOwner(petOwner);
    userService.updateUser(user);

    return petOwner;
  }
}
