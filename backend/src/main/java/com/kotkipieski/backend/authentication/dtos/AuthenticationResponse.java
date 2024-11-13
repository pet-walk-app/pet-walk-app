package com.kotkipieski.backend.authentication.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse
{

  private String token;
  private String expirationDate;
}
