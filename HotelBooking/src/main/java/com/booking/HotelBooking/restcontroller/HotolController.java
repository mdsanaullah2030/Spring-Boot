package com.booking.HotelBooking.restcontroller;

import com.booking.HotelBooking.entity.Hotel;
import com.booking.HotelBooking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("")
public class HotolController {


    @Autowired
    private HotelService hotelService;
@PostMapping("/save")
    public ResponseEntity<String>saveHtel(
        @RequestPart(value ="hotel" ) Hotel hotel,
        @RequestParam(value = "image",required = true)MultipartFile file
        ) throws IOException {
    hotelService.saveHotel(hotel,file);
return new ResponseEntity<>("Hotel Added successful", HttpStatus.OK);
    }






}
