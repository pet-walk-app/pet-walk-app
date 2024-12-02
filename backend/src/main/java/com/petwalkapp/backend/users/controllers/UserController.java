package com.petwalkapp.backend.users.controllers;

import static org.springframework.http.ResponseEntity.ok;

import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import com.petwalkapp.backend.users.dtos.UserUpdateRequest;
import com.petwalkapp.backend.users.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController
{

  private final IUserService userService;

  @GetMapping("/profile")
  public ResponseEntity<CurrentUserProfileDto> getCurrentUserProfile()
  {
    return ok(userService.getCurrentUserProfile());
  }

  @PostMapping("/profile")
  public ResponseEntity<CurrentUserProfileDto> updateCurrentUserProfile(
      @Valid @RequestBody UserUpdateRequest userUpdateRequest)
  {
    return ok(userService.updateUser(userUpdateRequest));
  }
}
