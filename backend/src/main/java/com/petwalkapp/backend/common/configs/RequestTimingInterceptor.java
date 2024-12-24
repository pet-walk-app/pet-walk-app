package com.petwalkapp.backend.common.configs;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class RequestTimingInterceptor implements HandlerInterceptor
{

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception
  {
    request.setAttribute("startTime", System.currentTimeMillis());
    return true;
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
      Object handler, Exception ex) throws Exception
  {
    long startTime = (Long) request.getAttribute("startTime");
    long elapsedTime = System.currentTimeMillis() - startTime;
    log.info("Request to {} took {} ms.", request.getRequestURI(), elapsedTime);
  }
}