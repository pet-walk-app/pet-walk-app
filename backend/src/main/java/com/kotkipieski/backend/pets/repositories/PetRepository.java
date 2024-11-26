package com.kotkipieski.backend.pets.repositories;

import com.kotkipieski.backend.pets.entities.Pet;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long>
{

  Optional<Pet> getPetById(Long petId);
}
