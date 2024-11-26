package com.kotkipieski.backend.offers.repositories;

import com.kotkipieski.backend.offers.entities.WalkOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalkOfferRepository extends JpaRepository<WalkOffer, Long>
{

}
