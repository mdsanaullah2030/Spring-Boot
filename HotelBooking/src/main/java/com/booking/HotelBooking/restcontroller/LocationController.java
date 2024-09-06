package com.booking.HotelBooking.restcontroller;

import com.booking.HotelBooking.entity.Location;
import com.booking.HotelBooking.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public class LocationController {

    @RestController
    @RequestMapping("/api/location")
    @CrossOrigin("*")
    public class LocationRestController {


        @Autowired
        private LocationService locationService;

        @GetMapping("/")
        public ResponseEntity<List<Location>> getAllLocation() {
            List<Location> locations = locationService.getLocation();
            return ResponseEntity.ok(locations);
        }

        @PostMapping("/save")
        public ResponseEntity<String> saveLocation(
                @RequestPart(value = "location") Location location,
                @RequestParam(value = "image", required = true) MultipartFile file
        ) throws IOException {
            locationService.saveLocation(location, file);

            return new ResponseEntity<>("Location added succesfully with image", HttpStatus.OK);

        }
    }
}
