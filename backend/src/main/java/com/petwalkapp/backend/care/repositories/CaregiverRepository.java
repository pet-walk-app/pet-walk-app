package com.petwalkapp.backend.care.repositories;

import com.petwalkapp.backend.care.entities.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, Long>
{
}
