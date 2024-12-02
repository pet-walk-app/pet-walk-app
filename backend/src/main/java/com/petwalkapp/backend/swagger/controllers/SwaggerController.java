package com.petwalkapp.backend.swagger.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Hidden
@RestController
@RequestMapping("/api/v1/docs")
public class SwaggerController
{

  @GetMapping
  public void docs(HttpServletResponse response) throws IOException
  {
    response.sendRedirect("/api/v1/docs/index.html");
  }
}
