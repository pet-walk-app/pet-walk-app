package com.petwalkapp.backend.common.configs;

import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer
{

  private final RequestTimingInterceptor requestTimingInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry)
  {
    registry.addInterceptor(requestTimingInterceptor);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry)
  {
    registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    registry.addResourceHandler("/uploads/**").addResourceLocations("file:uploads/");
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters)
  {
    MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();

    jsonConverter.setSupportedMediaTypes(Arrays.asList(
        MediaType.APPLICATION_JSON,
        MediaType.APPLICATION_OCTET_STREAM
    ));
    converters.add(jsonConverter);
  }
}
