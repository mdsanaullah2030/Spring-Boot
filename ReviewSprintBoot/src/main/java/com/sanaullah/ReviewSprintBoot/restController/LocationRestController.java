package com.sanaullah.ReviewSprintBoot.restController;

import com.sanaullah.ReviewSprintBoot.entity.Location;
import com.sanaullah.ReviewSprintBoot.service.LocationService;
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
private LocationService locationService;

@GetMapping("/save")
    public ResponseEntity<List<Location>>getAllLocation(){
        List<Location>locations=locationService.getAllLocation();
        return ResponseEntity.ok(locations);
    }

    public ResponseEntity<String>saveLocation(
            @RequestPart(value ="location" )Location location,
            @RequestParam(value = "image",required = true)MultipartFile file
            ) throws IOException {
locationService.saveLocation(location,file);
return new ResponseEntity<>("Location add successful", HttpStatus.OK);
    }
}
