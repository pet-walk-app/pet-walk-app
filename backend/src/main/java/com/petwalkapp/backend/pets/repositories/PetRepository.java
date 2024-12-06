package com.petwalkapp.backend.pets.repositories;

import com.petwalkapp.backend.pets.entities.Pet;
import com.petwalkapp.backend.pets.entities.PetOwner;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long>
{

  Optional<Pet> getPetById(Long petId);

  List<Pet> getPetsByIdInAndOwner(List<Long> ids, PetOwner petOwner);

  List<Pet> getPetsByOwner(PetOwner petOwner);
}
