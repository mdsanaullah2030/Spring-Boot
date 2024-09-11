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


    @DeleteMapping("/delete/{id}")
    public void deleteLocation(@PathVariable int id) {
        locetionService.deleteById(id);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateLocation(
            @PathVariable int id,
            @RequestPart(value = "location") Location location,
            @RequestParam(value = "image", required = false) MultipartFile file
    ) throws IOException {
        Location existingLocation = locetionService.findById(id);


        existingLocation.setName(location.getName());


        if (file != null && !file.isEmpty()) {
            String imageFileName = locetionService.saveImage(file, location);
            existingLocation.setImage(imageFileName);
        }

        locetionService.updateLocation(existingLocation);
        return new ResponseEntity<>("Location updated successfully", HttpStatus.OK);
    }
}
