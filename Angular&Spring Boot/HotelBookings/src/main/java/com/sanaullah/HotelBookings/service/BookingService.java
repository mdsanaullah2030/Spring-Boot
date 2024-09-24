package com.sanaullah.HotelBookings.service;

import com.sanaullah.HotelBookings.entity.Booking;
import com.sanaullah.HotelBookings.entity.Hotel;
import com.sanaullah.HotelBookings.entity.Room;
import com.sanaullah.HotelBookings.repository.BookingRepository;
import com.sanaullah.HotelBookings.repository.HotelRepository;
import com.sanaullah.HotelBookings.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;


    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private HotelRepository hotelRepository;


    public List<Booking> getALlBookins() {

        return bookingRepository.findAll();

    }

    public Booking getBookingById(int id) {

        return bookingRepository.findById(id).orElse(new Booking());
    }

    public void saveBookings(Booking booking) {
        Hotel hotel = hotelRepository.findById(booking.getHotel().getId())
                .orElseThrow(
                        () -> new RuntimeException("Booking not found " + booking.getHotel().getId())
                );
        booking.setHotel(hotel);
        bookingRepository.save(booking);
    }

}
