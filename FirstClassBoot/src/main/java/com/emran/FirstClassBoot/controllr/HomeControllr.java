package com.emran.FirstClassBoot.controllr;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeControllr {
    @RequestMapping("/")
    public String home(){
        return "index";
    }
    @RequestMapping("/contact")
    public String contact(){
        return "contact";
    }

}
