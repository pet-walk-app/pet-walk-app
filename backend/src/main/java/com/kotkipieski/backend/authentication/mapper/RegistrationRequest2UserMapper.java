package com.kotkipieski.backend.authentication.mapper;

import com.kotkipieski.backend.authentication.dtos.RegistrationRequest;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper
public abstract class RegistrationRequest2UserMapper {

  public static RegistrationRequest2UserMapper INSTANCE = Mappers.getMapper(
      RegistrationRequest2UserMapper.class);

  @Mapping(target = "password", source = "password", qualifiedByName = "mapPassword")
  @Mapping(target = "id", ignore = true)
  public abstract User map(RegistrationRequest request, @Context PasswordEncoder passwordEncoder);

  @Named("mapPassword")
  public String mapPassword(String password, @Context PasswordEncoder passwordEncoder) {
    return passwordEncoder.encode(password);
  }
}
