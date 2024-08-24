package com.emran.FirstClassBoot.restcontroller;

import com.emran.FirstClassBoot.entity.Faculty;
import com.emran.FirstClassBoot.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyRestController {
    @Autowired
    private FacultyService facultyService;


    @GetMapping("/")

    public List<Faculty>getAllFaculty(){
        return facultyService.getAllFac();
    }


    @PutMapping("/save")
    public void saveFaclty(@RequestBody Faculty f){
        facultyService.saveFaculty(f);

    }
    @DeleteMapping("/delete/{id}")
    public void deleteFaclty(@PathVariable("id")int id){
        facultyService.de
    }
}
