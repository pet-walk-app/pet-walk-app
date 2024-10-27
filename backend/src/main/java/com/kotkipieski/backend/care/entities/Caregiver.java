package com.kotkipieski.backend.care.entities;

import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.users.entities.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "caregivers")
public class Caregiver {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(mappedBy = "caregiver")
  private User user;

  private String city;

  @Lob
  private String description;

  @OneToMany(mappedBy = "caregiver")
  private List<CaregiverPhoto> photos;

  @OneToMany(mappedBy = "selectedCaregiver")
  private List<WalkOffer> acceptedOffers;

  @OneToMany(mappedBy = "caregiver")
  private List<CareProposal> proposals;
}
