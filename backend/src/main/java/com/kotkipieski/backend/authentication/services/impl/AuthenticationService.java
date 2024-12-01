package com.kotkipieski.backend.authentication.services.impl;

import com.kotkipieski.backend.authentication.dtos.AuthenticationRequest;
import com.kotkipieski.backend.authentication.dtos.AuthenticationResponse;
import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.authentication.exceptions.BadCredentialsException;
import com.kotkipieski.backend.authentication.exceptions.EmailTakenException;
import com.kotkipieski.backend.authentication.mapper.RegistrationRequest2UserMapper;
import com.kotkipieski.backend.authentication.services.IAuthenticationService;
import com.kotkipieski.backend.common.services.impl.DateMapper;
import com.kotkipieski.backend.security.services.IJwtService;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.exceptions.UserNotFoundException;
import com.kotkipieski.backend.users.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService
{

  public static final String DEFAULT_TIME_ZONE = "UTC";

  private final IUserService userService;
  private final IJwtService jwtService;
  private final DateMapper dateMapper;
  private final PasswordEncoder passwordEncoder;
  private final RegistrationRequest2UserMapper registrationRequest2UserMapper;

  @Override
  public AuthenticationResponse login(AuthenticationRequest request)
  {
    try {
      User user = userService.getUserByEmail(request.getEmail());
      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new BadCredentialsException();
      }

      return createAuthResponse(user);
    } catch (UserNotFoundException e) {
      throw new BadCredentialsException();
    }
  }

  @Override
  public AuthenticationResponse register(RegistrationRequest request)
  {
    User mappedUser = registrationRequest2UserMapper.map(request);
    if (userService.userExistsByEmail(mappedUser.getEmail())) {
      throw new EmailTakenException();
    }

    return createAuthResponse(userService.createUser(mappedUser));
  }

  private AuthenticationResponse createAuthResponse(User user)
  {
    String token = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(token)
        .expirationDate(dateMapper.getDateISO(jwtService.extractExpiration(token)))
        .build();
  }
}
