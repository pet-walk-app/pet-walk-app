package com.kotkipieski.backend.care.services;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ICaregiverImageService
{

  CaregiverResponse saveImages(@NotNull List<MultipartFile> imageFiles);

  void deleteImage(Long id);
}
