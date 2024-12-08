package com.petwalkapp.backend.offers.repositories;

import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.pets.entities.PetOwner;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
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
      + "FROM walk_offer WHERE status = 0 "
      + "AND (:radius IS NULL OR ST_Distance_Sphere(zip_code_location, "
      + "ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'))) <= :radius) "
      + "AND (:priceFrom IS NULL OR price >= :priceFrom) "
      + "AND (:priceTo IS NULL OR price <= :priceTo) "
      + "AND (:walkDateFrom IS NULL OR walk_date >= :walkDateFrom) "
      + "AND (:walkDateTo IS NULL OR walk_date <= :walkDateTo) "
      + "AND (:minTime IS NULL OR walk_length >= :minTime) "
      + "AND (:maxTime IS NULL OR walk_length <= :maxTime)",
      countQuery = "SELECT count(*) FROM walk_offer WHERE status = 0 "
          + "AND (:radius IS NULL OR ST_Distance_Sphere(zip_code_location, "
          + "ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'))) <= :radius) "
          + "AND (:priceFrom IS NULL OR price >= :priceFrom) "
          + "AND (:priceTo IS NULL OR price <= :priceTo) "
          + "AND (:walkDateFrom IS NULL OR walk_date >= :walkDateFrom) "
          + "AND (:walkDateEndLimit IS NULL OR walk_date <= :walkDateEndLimit) "
          + "AND (:minTime IS NULL OR walk_length >= :minTime) "
          + "AND (:maxTime IS NULL OR walk_length <= :maxTime)",
      nativeQuery = true)
  Page<WalkOffer> findByLocationWithinRadiusAndFilters(@Param("longitude") double longitude,
      @Param("latitude") double latitude, @Param("radius") Double radius,
      @Param("priceFrom") BigDecimal priceFrom, @Param("priceTo") BigDecimal priceTo,
      @Param("walkDateFrom") LocalDate walkDateFrom, @Param("walkDateTo") LocalDate walkDateTo,
      @Param("minTime") Double minTime, @Param("maxTime") Double maxTime, Pageable pageable);

  Optional<WalkOffer> findWalkOfferById(Long id);

  Page<WalkOffer> findWalkOfferByPetOwner(PetOwner petOwner, Pageable pageable);

  @Query("SELECT wo FROM WalkOffer wo JOIN wo.walkOfferApplications woa WHERE woa.caregiver = :currentCaregiver AND woa.isRejected = false AND wo.status = 0 AND wo.walkDate >= :walkDateFrom ORDER BY woa.applicationDate DESC")
  Page<WalkOffer> findPendingWalkOffers(@Param("currentCaregiver") Caregiver currentCaregiver,
      @Param("walkDateFrom") LocalDate walkDateFrom,
      Pageable pageable);

  @Query("SELECT wo FROM WalkOffer wo WHERE wo.selectedCaregiver = :currentCaregiver")
  Page<WalkOffer> findAcceptedWalkOffers(@Param("currentCaregiver") Caregiver currentCaregiver,
      Pageable pageable);
}