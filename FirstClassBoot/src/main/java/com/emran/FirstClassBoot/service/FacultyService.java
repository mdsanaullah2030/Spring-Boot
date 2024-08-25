package com.emran.FirstClassBoot.service;

import com.emran.FirstClassBoot.entity.Department;
import com.emran.FirstClassBoot.entity.Faculty;
import com.emran.FirstClassBoot.repository.DepartmentRepository;
import com.emran.FirstClassBoot.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;

    public void saveFaculty(Faculty f){

        facultyRepository.save(f);



    }
    public List<Faculty>getAllFac(){
        return facultyRepository.findAll();
    }
    public void deleteFacultyById(int in){
        facultyRepository.findById(in).get();
    }
    public Faculty findById(int id){
        return facultyRepository.findById(id).get();
    }
    public void updateFaculty(Faculty f){
        facultyRepository.save(f);
    }
}
