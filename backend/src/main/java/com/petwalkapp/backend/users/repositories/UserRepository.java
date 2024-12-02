package com.petwalkapp.backend.users.repositories;

import com.petwalkapp.backend.users.entities.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{

  boolean existsUserByEmail(String email);

  Optional<User> getUserByEmail(String email);

  Optional<User> getUserById(Long id);
}
