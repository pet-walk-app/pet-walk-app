package com.petwalkapp.backend.security.config;

import static com.petwalkapp.backend.security.constants.RequestMatchersConstants.API_DOCS_MATCHER;
import static com.petwalkapp.backend.security.constants.RequestMatchersConstants.AUTH_MATCHER;
import static com.petwalkapp.backend.security.constants.RequestMatchersConstants.STATIC_MATCHER;
import static com.petwalkapp.backend.security.constants.RequestMatchersConstants.UPLOADS_MATCHER;

import com.petwalkapp.backend.security.filters.AuthenticationFilter;
import com.petwalkapp.backend.security.filters.FilterChainExceptionHandler;
import com.petwalkapp.backend.security.handlers.BadRequestHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig
{

  private final AuthenticationFilter authFilter;
  private final FilterChainExceptionHandler exceptionHandler;
  private final UserDetailsService userDetailsService;

  @Qualifier("badRequestHandler") private final BadRequestHandler badRequestHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
  {
    return http.exceptionHandling(this::configureExceptionHandling)
        .csrf(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .formLogin(AbstractHttpConfigurer::disable)
        .logout(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(this::configureAuthorization)
        .sessionManagement(this::configureSessionManagement)
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(exceptionHandler, LogoutFilter.class)
        .build();
  }

  public void configureAuthorization(
      AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth)
  {
    auth.requestMatchers(AUTH_MATCHER, API_DOCS_MATCHER, UPLOADS_MATCHER, STATIC_MATCHER)
        .permitAll()
        //        .requestMatchers("/auth/user/**").hasAuthority("ROLE_VERIFIED_USER")
        .anyRequest()
        .authenticated();
  }

  public void configureSessionManagement(
      SessionManagementConfigurer<HttpSecurity> sessionManagement)
  {
    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  private void configureExceptionHandling(ExceptionHandlingConfigurer<HttpSecurity> configurer)
  {
    configurer.authenticationEntryPoint(badRequestHandler).accessDeniedHandler(badRequestHandler);
  }

  @Bean
  public AuthenticationProvider authenticationProvider()
  {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
    authenticationProvider.setUserDetailsService(userDetailsService);

    return authenticationProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration config) throws Exception
  {
    return config.getAuthenticationManager();
  }
}
