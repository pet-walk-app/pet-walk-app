package com.kotkipieski.backend.security.filters;

import com.kotkipieski.backend.security.exceptions.InvalidTokenException;
import com.kotkipieski.backend.security.services.IJwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationFilter extends OncePerRequestFilter
{

  private final IJwtService jwtService;

  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws IOException, ServletException
  {
    Authentication authentication = SecurityContextHolder.getContext()
        .getAuthentication();

    if (authentication != null) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      String token = getTokenFromRequest(request);
      String userEmail = getValidEmailFromToken(token);
      addTokenToContextIfValid(request, token, userEmail);
    } catch (InvalidTokenException e) {
      log.warn("Invalid token");
    }

    filterChain.doFilter(request, response);
  }

  private String getValidEmailFromToken(String token)
  {
    return Optional.ofNullable(jwtService.extractEmail(token))
        .orElseThrow(InvalidTokenException::new);
  }

  private String getTokenFromRequest(HttpServletRequest request)
  {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      throw new InvalidTokenException();
    }

    return authHeader.substring(7);
  }

  private void addTokenToContextIfValid(HttpServletRequest request, String token, String userEmail)
  {
    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

    if (jwtService.isTokenValid(token, userDetails)) {
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());
      authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext()
          .setAuthentication(authToken);
    }
  }
}
