package com.petwalkapp.backend.pets.entities;

import com.petwalkapp.backend.images.entities.Image;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "owner_id")
  private PetOwner owner;

  @NotBlank
  private String name;

  @NotBlank
  private String breed;

  @Lob
  @NotBlank
  private String description;

  @OneToOne
  @JoinColumn(name = "image_id", referencedColumnName = "id")
  private Image image;
}
