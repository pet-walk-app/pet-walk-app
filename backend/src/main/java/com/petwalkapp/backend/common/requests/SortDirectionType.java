package com.petwalkapp.backend.common.requests;

import lombok.Getter;

@Getter
public enum SortDirectionType
{

  ASC("asc"), DESC("desc");

  private final String value;

  SortDirectionType(String value)
  {
    this.value = value;
  }
}
