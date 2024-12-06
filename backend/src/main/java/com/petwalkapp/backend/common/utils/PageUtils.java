package com.petwalkapp.backend.common.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageUtils
{

  private static final int MAX_PAGE_SIZE = 100;

  public static Pageable createPageable(int page, int pageSize, Sort sort)
  {
    int validatedPageSize = Math.min(pageSize, MAX_PAGE_SIZE);
    return PageRequest.of(page, validatedPageSize, sort);
  }
}