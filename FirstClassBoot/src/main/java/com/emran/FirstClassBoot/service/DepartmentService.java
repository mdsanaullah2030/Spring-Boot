package com.emran.FirstClassBoot.service;

import com.emran.FirstClassBoot.entity.Department;
import com.emran.FirstClassBoot.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
@Autowired
    private DepartmentRepository departmentRepository;

    public void saveDep(Department d){
    departmentRepository.save(d);
    }

    public List<Department>getAllDep(){
        return departmentRepository.findAll();
    }
    public void deleteDepById(Integer id){
        departmentRepository.deleteById(id);
    }
public Department finById(Integer id){
        return departmentRepository.findById(id).get();
}
public void updateDep(Department d){
        departmentRepository.save(d);


}
}
