package com.kotkipieski.backend.offers.entities;

import com.kotkipieski.backend.care.entities.CareProposal;
import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.pets.entities.Pet;
import com.kotkipieski.backend.pets.entities.PetOwner;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
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
@Table(name = "walk_offers")
public class WalkOffer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private PetOwner petOwner;

  @ManyToOne
  private Caregiver selectedCaregiver;

  @ManyToMany
  private List<Pet> pets;

  private LocalDate walkDate;

  private Double walkLength;

  @Column(precision = 19, scale = 2)
  private BigDecimal price;

  private String streetName;

  private Long houseNumber;

  private Long apartmentNumber;

  private String zipCode;

  private String city;

  @Enumerated(EnumType.ORDINAL)
  private WalkOfferStatus status;

  @OneToMany(mappedBy = "walkOffer")
  private List<CareProposal> careProposals;
}