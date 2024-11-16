package com.kotkipieski.backend.swagger.config;

import com.kotkipieski.backend.security.dtos.ErrorResponse;
import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.core.converter.ResolvedSchema;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig
{

  @Bean
  public OpenAPI customOpenAPI()
  {
    return new OpenAPI().info(new Info().title("Pet Love App API").version("1.0"));
  }

  @Bean
  public OpenApiCustomizer swaggerCustomizer()
  {
    ResolvedSchema errResSchema = ModelConverters.getInstance()
        .resolveAsResolvedSchema(new AnnotatedType(ErrorResponse.class));
    Content content = new Content().addMediaType("application/json", new MediaType().schema(
        errResSchema.schema));
    return openApi -> openApi.getPaths()
        .values()
        .forEach(pathItem -> pathItem.readOperations()
            .forEach(operation -> operation.getResponses()
                .addApiResponse("400", new ApiResponse().description("Error 400-500")
                    .content(content))));
  }
}
