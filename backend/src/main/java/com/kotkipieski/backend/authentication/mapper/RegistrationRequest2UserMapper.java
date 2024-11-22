package com.kotkipieski.backend.authentication.mapper;

import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper
public interface RegistrationRequest2UserMapper
{

  @Mapping(target = "password", source = "password", qualifiedByName = "mapPassword")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "isFirstVisit", constant = "true")
  User map(RegistrationRequest request, @Context PasswordEncoder passwordEncoder);

  @Named("mapPassword")
  default String mapPassword(String password, @Context PasswordEncoder passwordEncoder)
  {
    return passwordEncoder.encode(password);
  }
}
