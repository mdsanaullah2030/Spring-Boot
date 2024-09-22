package com.sanaullah.HotelBookings.repository;

import com.sanaullah.HotelBookings.entity.Hotel;
import com.sanaullah.HotelBookings.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel,Integer> {

    @Query("SELECT h FROM Hotel h WHERE h.location.name = :locationName")
    List<Hotel> findHotelsByLocationName(@Param("locationName") String locationName);

    List<Hotel> findAllByLocationId(int locationId);

    public List<Hotel> deleteAllByLocationId(int locationId);
}
