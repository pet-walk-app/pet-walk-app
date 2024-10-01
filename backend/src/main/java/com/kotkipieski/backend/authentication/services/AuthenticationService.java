package com.kotkipieski.backend.authentication.services;


import com.kotkipieski.backend.authentication.dtos.AuthenticationRequest;
import com.kotkipieski.backend.authentication.dtos.AuthenticationResponse;
import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.authentication.exceptions.EmailTakenException;
import com.kotkipieski.backend.authentication.exceptions.InvalidAuthenticationException;
import com.kotkipieski.backend.authentication.mapper.RegistrationRequest2UserMapper;
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
    User mappedUser = RegistrationRequest2UserMapper.INSTANCE.map(request, passwordEncoder);

    if (userService.userExists(mappedUser.getEmail())) {
      throw new EmailTakenException();
    }

    return createAuthResponse(userService.createUser(mappedUser));
  }

  private AuthenticationResponse createAuthResponse(User user) {
    return AuthenticationResponse.builder()
        .token(jwtService.generateToken(user))
        .build();
  }
}
