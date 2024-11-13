package com.kotkipieski.backend.images.services.impl;

import com.kotkipieski.backend.common.services.IBaseUrlService;
import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.images.exceptions.InvalidFileExtensionException;
import com.kotkipieski.backend.images.exceptions.InvalidFileSizeException;
import com.kotkipieski.backend.images.exceptions.InvalidImageFileException;
import com.kotkipieski.backend.images.exceptions.UnsuccessfulUploadException;
import com.kotkipieski.backend.images.repositories.ImageRepository;
import com.kotkipieski.backend.images.services.IImageService;
import jakarta.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService
{

  public static final long MAX_FILE_SIZE = 3 * 1024 * 1024;
  public static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");
  private static final String UPLOADS_DIRECTORY = "uploads";
  private final IBaseUrlService baseUrlService;
  private final ImageRepository imageRepository;

  public static File getImageFile(String generatedImageName)
  {
    return new File(Paths.get(UPLOADS_DIRECTORY, generatedImageName)
        .toUri());
  }

  @Transactional
  @Override
  public void deleteImage(Image image)
  {
    imageRepository.delete(image);
  }

  @Transactional
  @Override
  public Image saveImage(MultipartFile imageFile)
  {
    String filename = imageFile.getOriginalFilename();
    validateImage(imageFile, filename);
    String generatedImageName = generateSafeFileName(filename);
    saveFile(imageFile, generatedImageName);

    return imageRepository.save(Image.builder()
        .url(generatedImageName)
        .build());
  }

  @Override
  public String getFullImageUrl(Image image)
  {
    if (Objects.isNull(image) || Objects.isNull(image.getUrl())) {
      return null;
    }

    return baseUrlService.getUploadsUrl() + "/" + image.getUrl();
  }

  private void validateImage(MultipartFile imageFile, String filename)
  {
    validateFileSize(imageFile);
    validateFileExtension(filename);
    validateFileNotCorrupted(imageFile);
  }

  private void saveFile(MultipartFile imageFile, String generatedImageName)
  {
    File targetFile = getImageFile(generatedImageName);
    try {
      File parentDir = targetFile.getParentFile();
      if (!parentDir.exists()) {
        parentDir.mkdirs();
      }
      if (!targetFile.exists()) {
        FileUtils.touch(targetFile);
      }
      imageFile.transferTo(targetFile);
    } catch (IOException e) {
      throw new UnsuccessfulUploadException();
    }
  }

  private void validateFileNotCorrupted(MultipartFile imageFile)
  {
    try {
      String mimeType = imageFile.getContentType();
      if (mimeType == null || !mimeType.startsWith("image")) {
        throw new InvalidImageFileException();
      }
      BufferedImage bufferedImage = ImageIO.read(imageFile.getInputStream());
      if (bufferedImage == null) {
        throw new InvalidImageFileException();
      }
    } catch (IOException exception) {
      throw new InvalidImageFileException();
    }
  }

  private void validateFileExtension(String fileName)
  {
    if (Objects.isNull(fileName) || !fileName.contains(".")) {
      throw new InvalidFileExtensionException();
    }
    String extension = fileName.substring(fileName.lastIndexOf(".") + 1)
        .toLowerCase();
    if (!ALLOWED_EXTENSIONS.contains(extension)) {
      throw new InvalidFileExtensionException();
    }
  }

  private void validateFileSize(MultipartFile file)
  {
    if (file.getSize() > MAX_FILE_SIZE) {
      throw new InvalidFileSizeException();
    }
  }

  private String generateSafeFileName(String originalFilename)
  {
    String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    String generatedFileName = UUID.randomUUID() + "." + extension;

    return isFileNameDuplicated(generatedFileName)
        ? generateSafeFileName(originalFilename)
        : generatedFileName;
  }

  private boolean isFileNameDuplicated(String fileName)
  {
    return imageRepository.existsByUrl(fileName);
  }
}
