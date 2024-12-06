package com.petwalkapp.backend.offers.entities;

import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.pets.entities.Pet;
import com.petwalkapp.backend.pets.entities.PetOwner;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalkOffer
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private PetOwner petOwner;

  @ManyToOne
  private Caregiver selectedCaregiver;

  @ManyToMany
  @NotEmpty
  private List<Pet> pets;

  @NotNull
  private LocalDate walkDate;

  @NotBlank
  @Lob
  private String description;

  @NotNull
  private Long walkLength;

  @NotNull
  @Column(precision = 19, scale = 2)
  private BigDecimal price;

  @NotBlank
  private String address;

  @NotBlank
  private String zipCode;

  @Column(columnDefinition = "POINT")
  @NotNull
  private Point zipCodeLocation;

  @NotBlank
  private String city;

  @Enumerated(EnumType.ORDINAL)
  @NotNull
  private WalkOfferStatus status;

  @OneToMany(orphanRemoval = true, cascade = {CascadeType.ALL})
  private List<WalkOfferApplication> walkOfferApplications;

  @NotNull
  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
