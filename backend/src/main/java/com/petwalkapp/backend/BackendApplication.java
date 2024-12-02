package com.petwalkapp.backend;

import java.util.Locale;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.petwalkapp.backend")
public class BackendApplication
{

  public static void main(String[] args)
  {
    Locale.setDefault(Locale.ENGLISH);
    SpringApplication.run(BackendApplication.class, args);
  }
}
