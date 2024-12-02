package com.kotkipieski.backend.offers.repositories;

import com.kotkipieski.backend.offers.entities.WalkOffer;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WalkOfferRepository extends JpaRepository<WalkOffer, Long>
{

  @Query(value = "SELECT *, ST_Distance_Sphere(zip_code_location, "
      + "ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'))) AS distance "
      + "FROM walk_offer WHERE ST_Distance_Sphere(zip_code_location, "
      + "ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'))) <= :radius "
      + "AND (:priceFrom IS NULL OR price >= :priceFrom) "
      + "AND (:priceTo IS NULL OR price <= :priceTo) "
      + "AND (:walkDateStartLimit IS NULL OR walk_date >= :walkDateStartLimit) "
      + "AND (:walkDateEndLimit IS NULL OR walk_date <= :walkDateEndLimit) "
      + "AND (:minTime IS NULL OR walk_length >= :minTime) "
      + "AND (:maxTime IS NULL OR walk_length <= :maxTime)", countQuery =
      "SELECT count(*) FROM walk_offer WHERE ST_Distance_Sphere(zip_code_location, "
          + "ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'))) <= :radius "
          + "AND (:priceFrom IS NULL OR price >= :priceFrom) "
          + "AND (:priceTo IS NULL OR price <= :priceTo) "
          + "AND (:walkDateStartLimit IS NULL OR walk_date >= :walkDateStartLimit) "
          + "AND (:walkDateEndLimit IS NULL OR walk_date <= :walkDateEndLimit) "
          + "AND (:minTime IS NULL OR walk_length >= :minTime) "
          + "AND (:maxTime IS NULL OR walk_length <= :maxTime)", nativeQuery = true)
  Page<WalkOffer> findByLocationWithinRadiusAndFilters(@Param("longitude") double longitude,
      @Param("latitude") double latitude, @Param("radius") double radius,
      @Param("priceFrom") BigDecimal priceFrom, @Param("priceTo") BigDecimal priceTo,
      @Param("walkDateStartLimit") LocalDate walkDateStartLimit,
      @Param("walkDateEndLimit") LocalDate walkDateEndLimit, @Param("minTime") Double minTime,
      @Param("maxTime") Double maxTime, Pageable pageable);
}