package com.petwalkapp.backend.security.constants;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "pet-walk-app")
@Getter
@Setter
public class ConfigProperties
{

  private String jwtSecret;

  private long expirationTime;

  private String googleMapsApiKey;
}
