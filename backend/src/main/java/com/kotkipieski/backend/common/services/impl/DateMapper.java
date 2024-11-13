package com.kotkipieski.backend.common.services.impl;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class DateMapper
{

  public static final String DEFAULT_TIME_ZONE = "UTC";

  public String getDateISO(Date date)
  {
    ZoneId zoneId = ZoneId.of(DEFAULT_TIME_ZONE);
    ZonedDateTime zonedDateTime = ZonedDateTime.from(date.toInstant()
        .atZone(zoneId));

    return zonedDateTime.format(DateTimeFormatter.ISO_INSTANT);
  }
}
