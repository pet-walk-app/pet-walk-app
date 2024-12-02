package com.petwalkapp.backend.images.repositories;

import com.petwalkapp.backend.images.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>
{

  boolean existsByUrl(String url);
}
