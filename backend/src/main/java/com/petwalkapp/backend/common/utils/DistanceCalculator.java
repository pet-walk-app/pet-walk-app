package com.petwalkapp.backend.common.utils;

public class DistanceCalculator
{

  public static double calculateDistance(double startLat, double startLong, double endLat,
      double endLong)
  {
    final int EARTH_RADIUS_KM = 6371;

    double startLatRad = Math.toRadians(startLat);
    double startLongRad = Math.toRadians(startLong);
    double endLatRad = Math.toRadians(endLat);
    double endLongRad = Math.toRadians(endLong);

    double deltaLat = endLatRad - startLatRad;
    double deltaLong = endLongRad - startLongRad;

    double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(startLatRad) * Math.cos(endLatRad) *
            Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  }

  private static double haversine(double val)
  {
    return Math.pow(Math.sin(val / 2), 2);
  }
}
