package com.emran.FirstClassBoot.controllr;


import com.emran.FirstClassBoot.entity.Student;
import com.emran.FirstClassBoot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.management.StringValueExp;
import java.util.List;

@Controller
public class StudentController {
    @Autowired
    private StudentService studentService;

    @RequestMapping("/savestudentform")
    public String saveStudent(Model m){
        m.addAttribute("student",new Student());
        m.addAttribute("title","Add New Student");
return "savestudentform";


    }
    @PostMapping("/savestudent")
    public  String saveStudent(@ModelAttribute("student")Student student){
        studentService.saveStu(student);

return "redirect:/";
    }
    @RequestMapping("/showAllStudent")
    public String showAllStudent(Model m){
        List<Student>stuList=studentService.getAllstu();
        m.addAttribute("stuList",stuList);
        return "showAllStudent";
    }
}
