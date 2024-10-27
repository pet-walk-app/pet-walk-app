package com.kotkipieski.backend.common.dtos;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {

  private String message;
  private Map<String, String> details; // 111
}
