package com.kotkipieski.backend.users.entities;

import com.kotkipieski.backend.care.entities.Caregiver;
import com.kotkipieski.backend.images.entities.Image;
import com.kotkipieski.backend.pets.entities.PetOwner;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "app_user")
public class User
{

  public static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "caregiver_id", referencedColumnName = "id")
  private Caregiver caregiver;

  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "pet_owner_id", referencedColumnName = "id")
  private PetOwner petOwner;

  @Column(name = "username", nullable = false)
  @NotBlank
  @Size(min = 5, max = 64)
  private String name;

  @Column(nullable = false, unique = true)
  @NotBlank
  @Email(regexp = EMAIL_REGEX)
  private String email;

  @Column(nullable = false)
  @NotBlank
  @Size(min = 5, max = 64)
  private String password;

  private LocalDate dateOfBirth;

  private String phone;

  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "image_id", referencedColumnName = "id")
  private Image image;
}
