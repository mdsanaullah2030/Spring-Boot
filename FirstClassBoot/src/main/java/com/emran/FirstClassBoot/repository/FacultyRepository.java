package com.emran.FirstClassBoot.repository;

import com.emran.FirstClassBoot.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty,Integer> {
}
