package com.kotkipieski.backend.authentication.constants;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "kotki-pieski")
@Getter
@Setter
public class ConfigProperties {

  private String jwtSecret;
  private long expirationTime;
}
