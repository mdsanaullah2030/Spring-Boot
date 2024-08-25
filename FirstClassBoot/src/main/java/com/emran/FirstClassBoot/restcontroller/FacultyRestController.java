package com.emran.FirstClassBoot.restcontroller;

import com.emran.FirstClassBoot.entity.Department;
import com.emran.FirstClassBoot.entity.Faculty;
import com.emran.FirstClassBoot.repository.DepartmentRepository;
import com.emran.FirstClassBoot.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyRestController {

    @Autowired
    private FacultyService facultyService;

@Autowired
    private DepartmentRepository departmentRepository;


    @GetMapping("/")
    public List<Faculty>getAllFaculty(){
        return facultyService.getAllFac();
    }


    @PostMapping("/save")
    public void saveFaclty(@RequestBody Faculty f){
        Department newDep = departmentRepository.findById(f.getDepartment().getId()).get();
        f.setDepartment(newDep);
        facultyService.saveFaculty(f);

    }
    @DeleteMapping("/delete/{id}")
    public void deleteFaclty(@PathVariable("id")int id){

        facultyService.deleteFacultyById(id);
    }
    @PutMapping("/update")
    public void updateFaclty(@RequestBody Faculty f){
        facultyService.saveFaculty(f);
    }
}
