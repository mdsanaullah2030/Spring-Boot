package com.emran.FirstClassBoot.restcontroller;

import com.emran.FirstClassBoot.entity.Student;
import com.emran.FirstClassBoot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student/api")
public class StudentRestController {


    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public List<Student> getAllStudent(){
      return  studentService.getAllstu();
    }
@PostMapping("/save")
    public void  saveStudent(@RequestBody Student s){
studentService.saveStu(s);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable int id){
        studentService.deleteById(id);
    }
    @PutMapping("/update/{id}")
public void updateStudent(@RequestBody Student s){
     studentService.saveStu(s);
}
}
