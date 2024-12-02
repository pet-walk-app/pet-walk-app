package com.petwalkapp.backend.common.dtos;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageDto<T>
{

  private List<T> content;
  private int totalPages;
  private long totalElements;
  private long numberOfElements;
  private int number;
  private int size;
  private boolean first;
  private boolean last;
  private boolean empty;
}
