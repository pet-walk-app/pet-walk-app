package com.kotkipieski.backend.pets.services;

import com.kotkipieski.backend.pets.dtos.PetDto;
import com.kotkipieski.backend.pets.dtos.PetSaveRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IPetService
{

  PetDto addPet(@Valid PetSaveRequest petSaveRequest, List<MultipartFile> files);
}
