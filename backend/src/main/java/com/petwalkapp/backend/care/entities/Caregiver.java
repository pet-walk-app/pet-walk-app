package com.petwalkapp.backend.care.entities;

import com.petwalkapp.backend.images.entities.Image;
import com.petwalkapp.backend.users.entities.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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

  @OneToMany(orphanRemoval = true, cascade = {CascadeType.ALL})
  private List<Image> images;

  @OneToOne(mappedBy = "caregiver")
  private User user;
}
