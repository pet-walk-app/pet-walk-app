package com.kotkipieski.backend.users.controllers;

import static org.springframework.http.ResponseEntity.ok;

import com.kotkipieski.backend.users.dtos.UserResponse;
import com.kotkipieski.backend.users.dtos.UserUpdateRequest;
import com.kotkipieski.backend.users.services.IUserService;
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

  @GetMapping
  public ResponseEntity<UserResponse> getUser()
  {
    return ok(userService.getCurrentUserData());
  }

  @PostMapping
  public ResponseEntity<UserResponse> updateUser(
      @Valid @RequestBody UserUpdateRequest userUpdateRequest)
  {
    return ok(userService.updateUser(userUpdateRequest));
  }
}
