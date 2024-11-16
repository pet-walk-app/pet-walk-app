package com.kotkipieski.backend.pets.services.impl;

import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.pets.dtos.PetDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequest;
import com.kotkipieski.backend.pets.entities.Pet;
import com.kotkipieski.backend.pets.entities.PetOwner;
import com.kotkipieski.backend.pets.mappers.PetDtoMapper;
import com.kotkipieski.backend.pets.mappers.PetSaveRequestMapper;
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
  private IUserService userService;
  private IImageService imageService;
  private PetDtoMapper petDtoMapper;
  private PetSaveRequestMapper petSaveRequestMapper;

  @Override
  public PetDto addPet(@Valid PetSaveRequest petSaveRequest, List<MultipartFile> petImages)
  {
    PetOwner currentPetOwner = getOrCreateCreatePetOwner();
    Pet pet = petRepository.save(petSaveRequestMapper.toPet(petSaveRequest));
    currentPetOwner.getPets().add(pet);

    petOwnerRepository.save(currentPetOwner);

    return petDtoMapper.toDto(pet);
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
