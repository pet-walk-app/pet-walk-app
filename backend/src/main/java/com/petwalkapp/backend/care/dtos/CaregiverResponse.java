package com.petwalkapp.backend.care.dtos;

import com.petwalkapp.backend.images.dtos.ImageResponse;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaregiverResponse
{

  private String city;

  private String description;

  private List<ImageResponse> images;
}
