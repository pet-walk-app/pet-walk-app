package com.kotkipieski.backend.users.adapters;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public record UserDetailsImpl(String email) implements UserDetails
{

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities()
  {
    return List.of(); // roles to be implemented
  }

  @Override
  public String getPassword()
  {
    return null;
  }

  /**
   * By default, spring uses username for authentication. We want the authentication to be done
   * via email, so we treat username as email.
   */
  @Override
  public String getUsername()
  {
    return email();
  }
}
