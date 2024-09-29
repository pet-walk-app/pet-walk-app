package com.kotkipieski.backend.authentication.dtos;

import com.kotkipieski.backend.user.entities.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

  @NotNull
  @Valid
  private User user;
}
