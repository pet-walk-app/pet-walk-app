package com.kotkipieski.backend.care.services;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ICaregiverImageService
{

  CaregiverResponse saveImages(List<MultipartFile> imageFiles);

  void deleteImage(Long id);
}
