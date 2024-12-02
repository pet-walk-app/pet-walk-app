package com.petwalkapp.backend.authentication.services;

import com.petwalkapp.backend.authentication.dtos.AuthenticationRequest;
import com.petwalkapp.backend.authentication.dtos.AuthenticationResponse;
import com.petwalkapp.backend.authentication.dtos.RegistrationRequest;

public interface IAuthenticationService
{

  AuthenticationResponse login(AuthenticationRequest request);

  AuthenticationResponse register(RegistrationRequest request);
}
