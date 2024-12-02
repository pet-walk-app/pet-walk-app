package com.petwalkapp.backend.pets.repositories;

import com.petwalkapp.backend.pets.entities.PetOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetOwnerRepository extends JpaRepository<PetOwner, Integer>
{

}
