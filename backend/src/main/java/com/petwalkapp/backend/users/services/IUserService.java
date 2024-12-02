package com.petwalkapp.backend.users.services;

import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import com.petwalkapp.backend.users.dtos.UserProfileDto;
import com.petwalkapp.backend.users.dtos.UserUpdateRequest;
import com.petwalkapp.backend.users.entities.User;
import com.petwalkapp.backend.users.exceptions.UserNotFoundException;

public interface IUserService
{

  User getUserByEmail(String email) throws UserNotFoundException;

  boolean userExistsByEmail(String email);

  User createUser(User user);

  void updateUser(User user);

  CurrentUserProfileDto updateUser(UserUpdateRequest userUpdateRequest);

  CurrentUserProfileDto getCurrentUserProfile();

  User getCurrentUser();

  UserProfileDto getUserProfileByUserId(Long id);
}
