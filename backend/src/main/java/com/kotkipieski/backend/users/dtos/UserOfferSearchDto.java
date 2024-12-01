package com.kotkipieski.backend.users.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOfferSearchDto
{

  private Long id;

  private String name;

  private String imageUrl;
}
