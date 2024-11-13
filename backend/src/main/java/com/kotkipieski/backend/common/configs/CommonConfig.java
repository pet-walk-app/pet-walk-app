package com.kotkipieski.backend.common.configs;

import com.google.gson.Gson;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonConfig
{

  @Bean
  public Gson gson()
  {
    return new Gson();
  }
}
