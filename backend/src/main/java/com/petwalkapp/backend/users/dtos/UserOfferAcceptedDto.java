package com.petwalkapp.backend.users.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOfferAcceptedDto
{

  private Long id;

  private String name;

  private String imageUrl;

  private String phone;
}
