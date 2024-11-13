package com.kotkipieski.backend.authentication.services;

import com.kotkipieski.backend.authentication.dtos.AuthenticationRequest;
import com.kotkipieski.backend.authentication.dtos.AuthenticationResponse;
import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;

public interface IAuthenticationService
{

  AuthenticationResponse login(AuthenticationRequest request);

  AuthenticationResponse register(RegistrationRequest request);
}
