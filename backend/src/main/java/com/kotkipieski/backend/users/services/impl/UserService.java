package com.kotkipieski.backend.users.services.impl;

import com.kotkipieski.backend.images.services.IImageService;
import com.kotkipieski.backend.users.adapters.UserDetailsImpl;
import com.kotkipieski.backend.users.dtos.UserResponse;
import com.kotkipieski.backend.users.dtos.UserUpdateRequest;
import com.kotkipieski.backend.users.entities.User;
import com.kotkipieski.backend.users.exceptions.EmailNotAvailableException;
import com.kotkipieski.backend.users.exceptions.UserNotFoundException;
import com.kotkipieski.backend.users.exceptions.UserNotPresentInSessionException;
import com.kotkipieski.backend.users.mappers.UserResponseMapper;
import com.kotkipieski.backend.users.mappers.UserUpdateRequestMapper;
import com.kotkipieski.backend.users.repositories.UserRepository;
import com.kotkipieski.backend.users.services.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService, IUserService
{

  private final UserRepository userRepository;
  private final UserResponseMapper userResponseMapper;
  private final UserUpdateRequestMapper userUpdateRequestMapper;
  private final IImageService imageService;

  /**
   * By default, spring uses username for authentication. We want authentication to be done via
   * email, so we treat username as email.
   */
  @Override
  public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(
      String username) throws UsernameNotFoundException
  {
    if (!userRepository.existsUserByEmail(username)) {
      throw new UserNotFoundException();
    }

    return new UserDetailsImpl(username);
  }

  @Override
  public User getUserByEmail(String email) throws UserNotFoundException
  {
    return userRepository.getUserByEmail(email).orElseThrow(UserNotFoundException::new);
  }

  @Override
  public boolean userExistsByEmail(String email)
  {
    return userRepository.getUserByEmail(email).isPresent();
  }

  @Override
  public User createUser(User user)
  {
    String email = user.getEmail();
    if (userExistsByEmail(email)) {
      throw new EmailNotAvailableException(email);
    }

    return userRepository.save(user);
  }

  @Override
  public void updateUser(User user)
  {
    userRepository.save(user);
  }

  @Override
  public UserResponse updateUser(UserUpdateRequest userUpdateRequest)
  {
    User currentUser = getCurrentUser();
    User updatedUser = userUpdateRequestMapper.toUser(currentUser, userUpdateRequest);

    userRepository.save(updatedUser);
    return userResponseMapper.toUserDetails(currentUser, imageService);
  }

  @Override
  public UserResponse getCurrentUserData()
  {
    User currentUser = getCurrentUser();
    return userResponseMapper.toUserDetails(currentUser, imageService);
  }

  @Override
  public User getCurrentUser()
  {
    var authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UserNotPresentInSessionException();
    }

    Object principal = authentication.getPrincipal();
    if (principal instanceof UserDetailsImpl userDetails) {
      return getUserByEmail(userDetails.email());
    }

    throw new UserNotPresentInSessionException();
  }
}
