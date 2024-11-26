package com.kotkipieski.backend.users.mappers;

import com.kotkipieski.backend.users.dtos.UserUpdateRequest;
import com.kotkipieski.backend.users.entities.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper
public interface UserUpdateRequestMapper
{

  @Mapping(target = "password", source = "password", qualifiedByName = "mapPassword")
  @Mapping(target = "isFirstVisit", constant = "false")
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateUserFromDto(UserUpdateRequest userUpdateRequest, @MappingTarget User user,
      @Context PasswordEncoder passwordEncoder);

  @Named("mapPassword")
  default String mapPassword(String password, @Context PasswordEncoder passwordEncoder)
  {
    return passwordEncoder.encode(password);
  }
}
