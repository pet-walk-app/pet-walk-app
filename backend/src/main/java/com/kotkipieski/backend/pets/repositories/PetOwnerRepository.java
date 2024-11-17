package com.kotkipieski.backend.pets.repositories;

import com.kotkipieski.backend.pets.entities.PetOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetOwnerRepository extends JpaRepository<PetOwner, Integer>
{

}
