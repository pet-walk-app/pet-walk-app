package com.kotkipieski.backend.authentication.mapper;

import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper
public abstract class RegistrationRequest2UserMapper
{

  @Autowired
  protected PasswordEncoder passwordEncoder;

  @Mapping(target = "password", source = "password", qualifiedByName = "mapPassword")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "isFirstVisit", constant = "true")
  public abstract User map(RegistrationRequest request);

  @Named("mapPassword")
  public String mapPassword(String password)
  {
    return passwordEncoder.encode(password);
  }
}
