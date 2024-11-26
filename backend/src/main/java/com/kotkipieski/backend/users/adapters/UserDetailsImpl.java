package com.kotkipieski.backend.users.adapters;

import com.kotkipieski.backend.users.entities.User;
import java.util.Collection;
import java.util.List;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails
{

  private final String email;
  private User cachedUser;

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
   * By default, spring uses username for authentication. We want the authentication to be done via
   * email, so we treat username as email.
   */
  @Override
  public String getUsername()
  {
    return getEmail();
  }
}
