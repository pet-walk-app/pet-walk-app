package com.petwalkapp.backend.common.utils;

public class DistanceCalculator
{

  private static final double SEMI_MAJOR_AXIS_MT = 6378137;
  private static final double SEMI_MINOR_AXIS_MT = 6356752.314245;
  private static final double FLATTENING = 1 / 298.257223563;
  private static final double ERROR_TOLERANCE = 1e-12;
  private static final double EARTH_RADIUS = 6371D;

  public static double calculateDistance(double startLat, double startLong, double endLat,
      double endLong)
  {

    double dLat = Math.toRadians((endLat - startLat));
    double dLong = Math.toRadians((endLong - startLong));

    startLat = Math.toRadians(startLat);
    endLat = Math.toRadians(endLat);

    double a = haversine(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversine(dLong);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
  }

  private static double haversine(double val)
  {
    return Math.pow(Math.sin(val / 2), 2);
  }
}
