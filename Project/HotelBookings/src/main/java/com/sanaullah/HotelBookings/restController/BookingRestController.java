package com.sanaullah.HotelBookings.restController;

import com.sanaullah.HotelBookings.entity.Booking;
import com.sanaullah.HotelBookings.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin("*")
public class BookingRestController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/save")
    public ResponseEntity<String> saveBooking(
            @RequestBody Booking booking
    ) throws IOException {

        bookingService.saveBookings(booking);

        return new ResponseEntity<>("Booking added successfully.", HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}
