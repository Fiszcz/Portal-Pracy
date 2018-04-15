package com.mwroblewski.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProfileController {
    @GetMapping("profile")
    public String profile(HttpServletRequest request) {
    	if(request.isUserInRole("ROLE_ADMIN"))
    		return "redirect:administration";
        return "redirect:profilew";
    }   
    
    @GetMapping("administration")
    public String administration() {
    	return "PanelAdministratorski5.html";
    }
    
    @GetMapping("profilew")
    public String profilew() {
        return "StronaProfilowa.html";
    }

    @GetMapping("editProfile")
    public String editProfile() {
    	return "EdycjaProfilu.html";
    }
    
    @GetMapping("addOffert")
    public String addOffert() {
    	return "KreatorOferty.html";
    }
    
    @GetMapping("seeOfferts")
    public String seeOfferts() {
    	return "ListaOfert2.html";
    }
    
    @GetMapping("lookProfile")
    public String lookProfile(@RequestParam String username) {
    	return "ProfilUzytkownika.html";
    }
    
}