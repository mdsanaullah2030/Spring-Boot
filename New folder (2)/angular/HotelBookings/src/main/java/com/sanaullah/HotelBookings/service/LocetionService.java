package com.sanaullah.HotelBookings.service;

import com.sanaullah.HotelBookings.entity.Location;
import com.sanaullah.HotelBookings.repository.LocationRepository;
import com.sanaullah.HotelBookings.repository.RoomRepository;
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
public class LocetionService {
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Value("src/main/resources/static/images")
    private String uploadDir;

    public List<Location> getALlLocation(){

        return locationRepository.findAll();

    }



    public void saveLocation(Location location, MultipartFile imageFile) throws IOException {



        if (imageFile != null && !imageFile.isEmpty()) {
            String imageFileName = saveImage(imageFile, location);
            location.setImage(imageFileName);
        }

        locationRepository.save(location);
    }



    public String saveImage(MultipartFile file, Location l) throws IOException {
        Path uploadPath = Paths.get(uploadDir + "/location");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = l.getName() + "_" + UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(filename);

        Files.copy(file.getInputStream(), filePath);


        return filename;
    }

    public void updateLocation(Location location, MultipartFile imageFile) throws IOException {




        if (imageFile != null && !imageFile.isEmpty()) {
            String imageFileName = saveImage(imageFile, location);
            location.setImage(imageFileName);
        }

        locationRepository.save(location);
    }

    public  void deleteById(int id){
        locationRepository.deleteById(id);
    }

    public void updateLocation(Location location) {
        locationRepository.save(location);
    }


    public  Location findById(int id){
        return   locationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Location Not Found by this Id"));
    }


}
