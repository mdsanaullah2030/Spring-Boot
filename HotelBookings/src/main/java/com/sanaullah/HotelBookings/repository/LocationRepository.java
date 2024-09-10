package com.sanaullah.HotelBookings.repository;

import com.sanaullah.HotelBookings.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location,Integer> {

}

