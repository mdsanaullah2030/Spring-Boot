package com.sanaullah.HotelBookings.service;

import com.sanaullah.HotelBookings.entity.Booking;
import com.sanaullah.HotelBookings.entity.Hotel;
import com.sanaullah.HotelBookings.entity.Room;
import com.sanaullah.HotelBookings.repository.BookingRepository;
import com.sanaullah.HotelBookings.repository.HotelRepository;
import com.sanaullah.HotelBookings.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(int id) {
        return bookingRepository.findById(id).orElse(new Booking());
    }

    public void saveBookings(Booking booking) throws IOException {
        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found for ID " + booking.getRoom().getId()));

        Hotel hotel = roomRepository.findHotelByRoomId(room.getId());


        java.sql.Date checkinDate = booking.getCheckindate();
        java.sql.Date checkoutDate = booking.getCheckoutdate();

    // Calculate the difference in milliseconds
        long diffInMillies = checkoutDate.getTime() - checkinDate.getTime();

    // Convert milliseconds to days
        int dayCount = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        float totalPrice=room.getPrice()*dayCount;

        booking.setTotalprice(totalPrice);

        booking.setRoom(room);
        booking.setHotel(hotel);

        bookingRepository.save(booking);



    }
}
