package com.kotkipieski.backend.offers.requests;

import lombok.Getter;

@Getter
public enum SearchWalkOfferSortByType
{
  PRICE("price"),
  WALK_LENGTH("walk_length"),
  WALK_DATE("walk_date");

  private final String value;

  SearchWalkOfferSortByType(String price)
  {
    this.value = price;
  }
}
