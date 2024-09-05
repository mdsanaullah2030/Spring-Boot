package com.booking.HotelBooking.service;

import com.booking.HotelBooking.entity.Hotel;
import com.booking.HotelBooking.entity.Location;
import com.booking.HotelBooking.repository.HotelRepositoy;
import com.booking.HotelBooking.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class HotelService {

    @Autowired
    private HotelRepositoy hotelRepositoy;

    @Autowired
    private LocationRepository locationRepository;

    @Value("src/main/resources/static/images")
    private String uploadDir;

    public List<Hotel> getAllHotels() {
        return hotelRepositoy.findAll();
    }

    public void saveHotel(Hotel hotel, MultipartFile imageFile) throws IOException {
        Location location = locationRepository.findById(hotel.getLocation().getId())
                .orElseThrow(() -> new RuntimeException("Location not found"));


        if (imageFile != null && !imageFile.isEmpty()) {
            String imageFilename = saveImage(imageFile, hotel);
            hotel.setImage(imageFilename);
        }

        hotel.setLocation(location);
        hotelRepositoy.save(hotel);

    }

    public List<Hotel>findHotelsByLocationName(String locationName){
        return hotelRepositoy.findHotelsByLocationName(locationName);

    }


    public void deleteHotelBuId(int id) {
        hotelRepositoy.deleteById(id);
    }

    public Hotel findById(int id) {
        return hotelRepositoy.findById(id).orElseThrow(() -> new RuntimeException("Hotel not Fond"));

    }

    private String saveImage(MultipartFile file, Hotel h) throws IOException {
        Path uploadPath = Paths.get(uploadDir + "/hotel");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String filename = h.getName() + "_" + UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(filename);

        Files.copy(file.getInputStream(), filePath);
        return filename;

    }
}



