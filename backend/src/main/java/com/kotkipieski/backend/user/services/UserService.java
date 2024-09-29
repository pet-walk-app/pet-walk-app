package com.kotkipieski.backend.user.services;

import com.kotkipieski.backend.user.dtos.UserDetailsImpl;
import com.kotkipieski.backend.user.entities.User;
import com.kotkipieski.backend.user.exceptions.EmailNotAvailableException;
import com.kotkipieski.backend.user.exceptions.UserNotFoundException;
import com.kotkipieski.backend.user.repositories.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * By default, spring uses username for authentication. We want authentication to be done via
   * email, so we treat username as email.
   **/
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return new UserDetailsImpl(userRepository.getUserByEmail(username)
        .orElseThrow(UserNotFoundException::new));
  }

  public Optional<User> getUser(String email) {
    return userRepository.getUserByEmail(email);
  }

  public boolean userExists(String email) {
    return userRepository.getUserByEmail(email).isPresent();
  }

  public User createUser(User user) {
    String email = user.getEmail();

    if (userExists(email)) {
      throw new EmailNotAvailableException(email);
    }

    return userRepository.save(user);
  }
}
