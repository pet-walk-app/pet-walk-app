package com.kotkipieski.backend.pets.entities;

import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.users.entities.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class PetOwner
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "owner_id")
  private List<Pet> pets = new ArrayList<>();

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "petOwner")
  private List<WalkOffer> walkOffers = new ArrayList<>();

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
}
