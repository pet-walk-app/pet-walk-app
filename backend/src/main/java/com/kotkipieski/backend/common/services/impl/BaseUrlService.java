package com.kotkipieski.backend.common.services.impl;

import com.kotkipieski.backend.common.services.IBaseUrlService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class BaseUrlService implements IBaseUrlService
{

  public static final String UPLOADS_PATH = "/uploads";

  @Override
  public String getServerUrl()
  {
    return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
  }

  @Override
  public String getUploadsUrl()
  {
    return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()
        + UPLOADS_PATH;
  }
}
