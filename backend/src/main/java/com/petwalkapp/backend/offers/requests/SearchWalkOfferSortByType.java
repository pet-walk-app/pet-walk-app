package com.petwalkapp.backend.offers.requests;

import lombok.Getter;

@Getter
public enum SearchWalkOfferSortByType
{

  PRICE("price"),
  WALK_LENGTH("walk_length"),
  WALK_DATE("walk_date"),
  DISTANCE("distance"),
  CREATION_TIME("created_at");

  private final String field;

  SearchWalkOfferSortByType(String field)
  {
    this.field = field;
  }
}
