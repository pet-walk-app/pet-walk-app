package com.kotkipieski.backend.authentication.controllers;

import com.kotkipieski.backend.authentication.dtos.AuthenticationRequest;
import com.kotkipieski.backend.authentication.dtos.AuthenticationResponse;
import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.authentication.services.AuthenticationService;
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
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PostMapping("login")
  public ResponseEntity<AuthenticationResponse> login(
      @Valid @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @PostMapping("register")
  public ResponseEntity<AuthenticationResponse> register(
      @Valid @RequestBody RegistrationRequest request
  ) {
    return ResponseEntity.ok(authenticationService.register(request));
  }

//  @PostMapping("resend-verification")
//  public ResponseEntity<AuthenticationResponse> resend(
//      @Valid @RequestBody RegistrationRequest request
//  ) {
//    return ResponseEntity.ok(authenticationService.register(request));
//  }
}
