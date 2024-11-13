package com.kotkipieski.backend.users.services;

import com.kotkipieski.backend.users.dtos.UserResponse;
import com.kotkipieski.backend.users.dtos.UserUpdateRequest;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.exceptions.UserNotFoundException;

public interface IUserService
{

  User getUserByEmail(String email) throws UserNotFoundException;

  boolean userExistsByEmail(String email);

  User createUser(User user);

  void updateUser(User user);

  UserResponse updateUser(UserUpdateRequest userUpdateRequest);

  UserResponse getCurrentUserData();

  User getCurrentUser();
}
