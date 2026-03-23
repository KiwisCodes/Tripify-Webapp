package com.vgu.tripify.repository;

import com.vgu.tripify.domain.entity.Trip;
import com.vgu.tripify.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring JPA will automatically wired the method "based on method name"
    boolean existsByEmail(String email);

}
