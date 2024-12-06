package com.petwalkapp.backend.common.mappers;

import com.petwalkapp.backend.common.dtos.PageDto;
import org.springframework.data.domain.Page;

public interface PageDtoMapper<From, To>
{

  PageDto<To> toPageDto(Page<From> page);
}
