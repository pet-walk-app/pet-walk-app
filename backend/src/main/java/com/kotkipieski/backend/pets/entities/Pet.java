package com.kotkipieski.backend.pets.entities;

import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
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

  @ManyToOne
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

  @ManyToMany(mappedBy = "pets")
  private List<WalkOffer> walkOffers = new ArrayList<>();
}
