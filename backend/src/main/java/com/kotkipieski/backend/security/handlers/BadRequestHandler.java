package com.kotkipieski.backend.security.handlers;

import com.google.gson.Gson;
import com.kotkipieski.backend.security.dtos.ErrorResponse;
import com.kotkipieski.backend.security.exceptions.IExceptionWithPublicMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component("badRequestHandler")
@RequiredArgsConstructor
public class BadRequestHandler implements AuthenticationEntryPoint, AccessDeniedHandler
{

  public static final String UNAUTHORIZED = "Unauthorized";
  public static final String ACCESS_DENIED = "Access denied";
  private final Gson gson;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException
  {
    String errorMessage = Optional.ofNullable(request.getAttribute("exception"))
        .filter(exception -> exception instanceof IExceptionWithPublicMessage)
        .map(IExceptionWithPublicMessage.class::cast)
        .map(IExceptionWithPublicMessage::getPublicErrorMessage)
        .orElse(UNAUTHORIZED);
    sendResponse(response, errorMessage, HttpServletResponse.SC_UNAUTHORIZED);
  }

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException
  {
    sendResponse(response, ACCESS_DENIED, HttpServletResponse.SC_FORBIDDEN);
  }

  private void sendResponse(HttpServletResponse response, String errorMessage,
      int statusCode) throws IOException
  {
    PrintWriter out = response.getWriter();
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.setStatus(statusCode);
    out.write(gson.toJson(ErrorResponse.builder().message(errorMessage).build()));
    out.flush();
  }
}
