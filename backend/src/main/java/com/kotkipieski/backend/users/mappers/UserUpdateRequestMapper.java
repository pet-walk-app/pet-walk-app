package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.users.dtos.UserUpdateRequest;
import com.kotkipieski.backend.users.entities.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUpdateRequestMapper
{

  private PasswordEncoder passwordEncoder;

  public User toUser(User currentUser, UserUpdateRequest userResponseMapper)
  {
    currentUser.setName(userResponseMapper.getName());
    currentUser.setEmail(userResponseMapper.getEmail());
    currentUser.setDateOfBirth(userResponseMapper.getDateOfBirth());
    currentUser.setPhone(userResponseMapper.getPhone());
    Optional.ofNullable(userResponseMapper.getPassword())
        .ifPresent(password -> currentUser.setPassword(passwordEncoder.encode(password)));

    return currentUser;
  }
}
