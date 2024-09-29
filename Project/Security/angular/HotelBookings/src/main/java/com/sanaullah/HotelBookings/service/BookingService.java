package com.sanaullah.HotelBookings.service;

import com.sanaullah.HotelBookings.entity.Booking;
import com.sanaullah.HotelBookings.entity.Hotel;
import com.sanaullah.HotelBookings.entity.Room;
import com.sanaullah.HotelBookings.repository.BookingRepository;
import com.sanaullah.HotelBookings.repository.HotelRepository;
import com.sanaullah.HotelBookings.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Date;
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


        java.sql.Date checkindate = booking.getCheckindate();
        java.sql.Date checkoutdate = booking.getCheckoutdate();
//
//    // Calculate the difference in milliseconds
//        long diffInMillies = checkoutdate.getTime() - checkindate.getTime();
//
//    // Convert milliseconds to days
//        int dayCount = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
//        float totalPrice=room.getPrice()*dayCount;
//
//        booking.setTotalprice(totalPrice);

        booking.setRoom(room);
        booking.setHotel(hotel);

        bookingRepository.save(booking);



    }



    public void updateBooking(int id, Booking updatedBooking) {
        // Fetch the existing booking
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with this ID"));

        // Update booking fields
        existingBooking.setCheckindate(updatedBooking.getCheckindate());
        existingBooking.setCheckoutdate(updatedBooking.getCheckoutdate());

        // Recalculate the total price based on updated check-in and check-out dates
        long diffInMillies = updatedBooking.getCheckoutdate().getTime() - updatedBooking.getCheckindate().getTime();
        int dayCount = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        float totalPrice = existingBooking.getRoom().getPrice() * dayCount;
        existingBooking.setTotalprice(totalPrice);

        // Find and set the room associated with the booking
        Room room = roomRepository.findById(updatedBooking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room with this ID not found"));
        existingBooking.setRoom(room);

        // Save the updated booking (not the room)
        bookingRepository.save(existingBooking);
    }

}