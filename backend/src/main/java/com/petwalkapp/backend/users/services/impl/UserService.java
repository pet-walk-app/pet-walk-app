package com.petwalkapp.backend.users.services.impl;

import com.petwalkapp.backend.images.services.IImageService;
import com.petwalkapp.backend.users.adapters.UserDetailsImpl;
import com.petwalkapp.backend.users.dtos.CurrentUserProfileDto;
import com.petwalkapp.backend.users.dtos.UserUpdateRequest;
import com.petwalkapp.backend.users.entities.User;
import com.petwalkapp.backend.users.exceptions.EmailNotAvailableException;
import com.petwalkapp.backend.users.exceptions.UserNotFoundException;
import com.petwalkapp.backend.users.exceptions.UserNotPresentInSessionException;
import com.petwalkapp.backend.users.mappers.CurrentUserProfileDtoMapper;
import com.petwalkapp.backend.users.mappers.UserUpdateRequestMapper;
import com.petwalkapp.backend.users.repositories.UserRepository;
import com.petwalkapp.backend.users.services.IUserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService, IUserService
{

  private final UserRepository userRepository;
  private final CurrentUserProfileDtoMapper currentUserProfileDtoMapper;
  private final UserUpdateRequestMapper userUpdateRequestMapper;
  private final IImageService imageService;
  private final PasswordEncoder passwordEncoder;

  @PersistenceContext
  private EntityManager entityManager;

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
  public CurrentUserProfileDto updateUser(UserUpdateRequest userUpdateRequest)
  {
    User currentUser = getCurrentUser();
    userUpdateRequestMapper.updateUserFromDto(userUpdateRequest, currentUser, passwordEncoder);

    userRepository.save(currentUser);
    return currentUserProfileDtoMapper.toCurrentUserProfile(currentUser);
  }

  @Override
  public CurrentUserProfileDto getCurrentUserProfile()
  {
    User currentUser = getCurrentUser();
    return currentUserProfileDtoMapper.toCurrentUserProfile(currentUser);
  }

  @Override
  public User getCurrentUser()
  {
    var authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UserNotPresentInSessionException();
    }

    Object principal = authentication.getPrincipal();
    if (!(principal instanceof UserDetailsImpl userDetails)) {
      throw new UserNotPresentInSessionException();
    }

    User user = userDetails.getCachedUser();

    if (Objects.nonNull(user) && entityManager.contains(user)) {
      return user;
    }

    user = getUserByEmail(userDetails.getEmail());
    userDetails.setCachedUser(user);

    return user;
  }
}
