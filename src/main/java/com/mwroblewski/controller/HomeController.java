package com.mwroblewski.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home(HttpServletRequest request) {
    	if(request.isUserInRole("ROLE_ADMIN"))
    		return "redirect:administration";
    	else if(request.isUserInRole("ROLE_USER"))
    		return "redirect:profile";
        return "StronaGlowna.html";
    }   
    
    @RequestMapping("/aboutUs")
    public String aboutUs() {
    	return "ONas.html";
    }
}