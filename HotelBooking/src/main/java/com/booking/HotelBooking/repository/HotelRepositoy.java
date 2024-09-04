package com.booking.HotelBooking.repository;

import com.booking.HotelBooking.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepositoy extends JpaRepository<Hotel,Integer> {
}
