package com.emran.FirstClassBoot.service;

import com.emran.FirstClassBoot.entity.Student;
import com.emran.FirstClassBoot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public  void  saveStu(Student s){
        studentRepository.save(s);
    }

    public List<Student> getAllstu(){
        return studentRepository.findAll();
    }
    public  void deleteById( int id){
        studentRepository.deleteById(id);
    }
      public Student findbiId(int id){
        return  studentRepository.findById(id).get();

      }
      public void updateStudent(Student s,int id){
        studentRepository.save(s);
      }

}
