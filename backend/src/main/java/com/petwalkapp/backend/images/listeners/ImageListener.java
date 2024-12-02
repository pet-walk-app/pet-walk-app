package com.petwalkapp.backend.images.listeners;

import static com.petwalkapp.backend.images.services.impl.ImageService.getImageFile;

import com.petwalkapp.backend.images.entities.Image;
import com.petwalkapp.backend.images.exceptions.UnsuccessfulDeleteException;
import jakarta.persistence.PostRemove;
import java.io.File;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ImageListener
{

  @PostRemove
  private void beforeAnyUpdate(Image image)
  {
    File imageFile = getImageFile(image.getUrl());
    if (!imageFile.exists()) {
      return;
    }
    if (!imageFile.delete()) {
      throw new UnsuccessfulDeleteException();
    }
  }
}
