package com.sanaullah.HotelBookings.restController;

import com.sanaullah.HotelBookings.entity.Location;
import com.sanaullah.HotelBookings.service.LocetionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/location")
@CrossOrigin("*")
public class LocationRestController {
    @Autowired
    private LocetionService locetionService;

    @GetMapping("/")
    public ResponseEntity<List<Location>> getAllLocation() {
        List<Location> locations = locetionService.getALlLocation();
        return ResponseEntity.ok(locations);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveLocation(
            @RequestPart(value = "location") Location location,
            @RequestParam(value = "image", required = true) MultipartFile file
    ) throws IOException {
        locetionService.saveLocation(location, file);

        return new ResponseEntity<>("Location added succesfully with image", HttpStatus.OK);

    }

    @PutMapping("/update")
    public ResponseEntity<String> updateLocation(
            @RequestPart(value = "location") Location location,
            @RequestParam(value = "image", required = true) MultipartFile file
    ) throws IOException {
        locetionService.updateLocation(location, file);

        return new ResponseEntity<>("Location added succesfully with image", HttpStatus.OK);

    }
}
