package com.sanaullah.HotelBookings.repository;

import com.sanaullah.HotelBookings.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel,Integer> {
    @Query("SELECT h FROM Hotel h WHERE h.location.name=:locationName ")
    List<Hotel> finndHotelByLocationName(@Param("locationName") String locationName);

}
