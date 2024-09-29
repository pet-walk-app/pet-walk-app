package com.kotkipieski.backend.user.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

  private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "username", nullable = false)
  @NotBlank(message = "Username cannot be empty")
  @Size(min = 5, max = 64, message = "User name must be of length 5-64")
  private String name;

  @Column(nullable = false, unique = true)
  @NotBlank(message = "Email cannot be blank")
  @Email(message = "Invalid email", regexp = EMAIL_REGEX)
  private String email;

  @Column(nullable = false)
  @NotNull(message = "Password cannot be null")
  private String password;

}
