package com.emran.FirstClassBoot.restcontroller;

import com.emran.FirstClassBoot.entity.Department;
import com.emran.FirstClassBoot.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dep")
public class DepartmentRestController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/")
    public List<Department> getAllDep(){
        return departmentService.getAllDep();
    }
    @PostMapping("/save")
    public void saveDep(@RequestBody Department d){
        departmentService.saveDep(d);
    }
   public DepartmentService getDepartmentService(){
        return departmentService;
   }
   @DeleteMapping("/delete/{id}")
    public void deletDrp(@PathVariable("id") int id){
        departmentService.deleteDepById(id);
    }

    @PutMapping("/update")
    public void updateDep(@RequestBody Department d){
        departmentService.updateDep(d);
    }

}
