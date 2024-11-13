package com.kotkipieski.backend.care.repositories;

import com.kotkipieski.backend.care.entities.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, Integer>
{
}
