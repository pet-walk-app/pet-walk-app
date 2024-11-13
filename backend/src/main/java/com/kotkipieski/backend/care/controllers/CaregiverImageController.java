package com.kotkipieski.backend.care.controllers;

import com.kotkipieski.backend.care.dtos.CaregiverResponse;
import com.kotkipieski.backend.care.services.ICaregiverImageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/caregiver/images")
public class CaregiverImageController
{

  private final ICaregiverImageService caregiverImageService;

  @PostMapping
  public ResponseEntity<CaregiverResponse> saveImages(
      @RequestParam("files") List<MultipartFile> files)
  {
    return ResponseEntity.ok(caregiverImageService.saveImages(files));
  }

  @DeleteMapping("{id}")
  public void deleteImage(@PathVariable("id") Long id)
  {
    caregiverImageService.deleteImage(id);
  }
}
