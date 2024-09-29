package com.kotkipieski.backend.user.dtos;

import com.kotkipieski.backend.user.entities.User;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {

  private final User user;

  public UserDetailsImpl(User user) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getPassword() {
    return null;
  }

  /**
   * By default, spring uses username for authentication. We want the authentication to be done via
   * email, so we treat username as email.
   **/
  @Override
  public String getUsername() {
    return user.getEmail();
  }
}
