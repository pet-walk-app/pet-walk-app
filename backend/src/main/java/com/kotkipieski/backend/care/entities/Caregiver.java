package com.kotkipieski.backend.care.entities;

import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
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
public class Caregiver
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  private String city;

  @Lob
  @NotEmpty
  private String description;

  @OneToMany(cascade = CascadeType.REMOVE)
  @JoinColumn(name = "image_id", referencedColumnName = "id")
  private List<Image> images;

  @OneToMany(mappedBy = "selectedCaregiver")
  private List<WalkOffer> acceptedOffers;

  @OneToMany(mappedBy = "caregiver")
  private List<CareProposal> proposals;
}
