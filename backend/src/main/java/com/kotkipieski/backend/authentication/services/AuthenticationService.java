package com.kotkipieski.backend.authentication.services;


import com.kotkipieski.backend.authentication.dtos.AuthenticationRequest;
import com.kotkipieski.backend.authentication.dtos.AuthenticationResponse;
import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.authentication.exceptions.InvalidAuthenticationException;
import com.kotkipieski.backend.user.entities.User;
import com.kotkipieski.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthenticationResponse login(AuthenticationRequest request) {
    User user = userService.getUser(request.getEmail())
        .orElseThrow(InvalidAuthenticationException::new);

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new InvalidAuthenticationException();
    }

    return createAuthResponse(user);
  }

  public AuthenticationResponse register(RegistrationRequest request) {
    return createAuthResponse(userService.createUser(request.getUser()));
  }

  private AuthenticationResponse createAuthResponse(User user) {
    return AuthenticationResponse.builder()
        .token(jwtService.generateToken(user))
        .build();
  }
}
