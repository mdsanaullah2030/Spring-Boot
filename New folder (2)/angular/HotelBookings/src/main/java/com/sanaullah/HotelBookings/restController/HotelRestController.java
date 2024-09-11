package com.sanaullah.HotelBookings.restController;

import com.sanaullah.HotelBookings.entity.Hotel;
import com.sanaullah.HotelBookings.entity.Location;
import com.sanaullah.HotelBookings.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/hotel")
@CrossOrigin("*")
public class HotelRestController {


    @Autowired
    private HotelService hotelService;


    @PostMapping("/save")
    public ResponseEntity<String> saveHotel(
            @RequestPart(value = "hotel") Hotel hotel,
            @RequestParam(value = "image", required = true)MultipartFile file
    ) throws IOException {

        hotelService.saveHotel(hotel,file);

        return new ResponseEntity<>("Hotel added successfully with image.", HttpStatus.OK);

    }


    @GetMapping("/")
    public ResponseEntity<List<Hotel>> getAllHotel() {
        List<Hotel> hotels = hotelService.getAllHotel();
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/h/searchhotel")
    public ResponseEntity<List<Hotel>> findHotelsByLocationName(@RequestParam(value = "locationName") String locationName) {
        List<Hotel> hotels = hotelService.findHotelsByLocationName(locationName);
        return ResponseEntity.ok(hotels);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Hotel> findHotelById(@PathVariable int id) {
        try {
            Hotel hotel = hotelService.findHotelById(id);
            return ResponseEntity.ok(hotel);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deletehotel/{id}")
    public void deleteById(@PathVariable int id) {
        hotelService.deleteById(id);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateHotel(
            @PathVariable int id,
            @RequestPart(value = "location") Hotel hotel,
            @RequestParam(value = "image", required = false) MultipartFile file
    ) throws IOException {
        Hotel existingHotel = hotelService.findById(id);


        existingHotel.setName(hotel.getName());


        if (file != null && !file.isEmpty()) {
            String imageFileName = hotelService.saveImage(file, hotel);
            existingHotel.setImage(imageFileName);
        }

        hotelService.updateHotel(existingHotel);
        return new ResponseEntity<>("Location updated successfully", HttpStatus.OK);
    }


}
