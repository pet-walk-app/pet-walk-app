package com.petwalkapp.backend.authentication.controllers;

import com.petwalkapp.backend.authentication.dtos.AuthenticationRequest;
import com.petwalkapp.backend.authentication.dtos.AuthenticationResponse;
import com.petwalkapp.backend.authentication.dtos.RegistrationRequest;
import com.petwalkapp.backend.authentication.services.IAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController
{

  private final IAuthenticationService authenticationService;

  @PostMapping("login")
  public ResponseEntity<AuthenticationResponse> login(
      @Valid @RequestBody AuthenticationRequest request)
  {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @PostMapping("register")
  public ResponseEntity<AuthenticationResponse> register(
      @Valid @RequestBody RegistrationRequest request)
  {
    return ResponseEntity.ok(authenticationService.register(request));
  }
}
