package com.kotkipieski.backend;

import java.util.Locale;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kotkipieski.backend")
public class BackendApplication
{

  public static void main(String[] args)
  {
    Locale.setDefault(Locale.ENGLISH);
    SpringApplication.run(BackendApplication.class, args);
  }
}
