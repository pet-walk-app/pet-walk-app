package com.kotkipieski.backend.security.services.impl;

import com.kotkipieski.backend.security.services.IJwtService;
import com.kotkipieski.backend.users.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService
{

  @Value("${kotki-pieski.jwt-secret}")
  private String SECRET_KEY;
  @Value("${kotki-pieski.expiration-time}")
  private long TOKEN_EXPIRATION_TIME;

  @Override
  public String generateToken(String email)
  {
    return Jwts.builder()
        .subject(email)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
        .signWith(getSignInKey())
        .compact();
  }

  @Override
  public String generateToken(User user)
  {
    return generateToken(user.getEmail());
  }

  @Override
  public boolean isTokenValid(String token, UserDetails userDetails)
  {
    final String email = extractEmail(token);
    return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  @Override
  public String extractEmail(String token)
  {
    return extractClaim(token, Claims::getSubject);
  }

  @Override
  public Date extractExpiration(String token)
  {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
  {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token)
  {
    return Jwts.parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  private boolean isTokenExpired(String token)
  {
    return extractExpiration(token).before(new Date());
  }

  private SecretKey getSignInKey()
  {
    byte[] bytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(bytes);
  }
}
