package com.petwalkapp.backend.security.services;

import com.petwalkapp.backend.users.entities.User;
import java.util.Date;
import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService
{

  String generateToken(String email);

  String generateToken(User user);

  boolean isTokenValid(String token, UserDetails userDetails);

  String extractEmail(String token);

  Date extractExpiration(String token);
}
