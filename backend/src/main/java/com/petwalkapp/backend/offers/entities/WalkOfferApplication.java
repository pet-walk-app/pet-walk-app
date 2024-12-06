package com.petwalkapp.backend.offers.entities;

import com.petwalkapp.backend.care.entities.Caregiver;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "walk_offer_applications")
public class WalkOfferApplication
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Caregiver caregiver;

  @ManyToOne(optional = false)
  private WalkOffer walkOffer;

  @NotNull private LocalDateTime applicationDate;
}
