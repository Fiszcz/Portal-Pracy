package com.mwroblewski.api;

import com.mwroblewski.entity.Profile;

import com.mwroblewski.entity.User;
import com.mwroblewski.repository.ProfileDAO;
import com.mwroblewski.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileApiController {
	
    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserDAO userDAO;
    @Autowired
    ProfileDAO profileDAO;

    @GetMapping("/all")
    public List<Profile> getAllProfile() {

        return (List<Profile>) profileDAO.findAll();
    }
    
    @GetMapping("/allUser")
    public List<User> getAllUser() {
    	
        return (List<User>) userDAO.findAll();
    }

    @GetMapping("/user")
    public Profile getUserProfile(@AuthenticationPrincipal Principal principal){

        User user = userDAO.findByUsername(principal.getName());

        return user.getProfile();
    }
    
    @PostMapping("delete")
    public void deleteUser (@RequestBody String username) {
    	User user = userDAO.findByUsername(username);
    	userDAO.delete(user);
    }
    
    @PostMapping("/userOther")
    public Profile getUserProfileOther (@RequestBody String username) {
    	User user = userDAO.findByUsername(username);
    	Profile profile = profileDAO.findByUser(user);
    	return profile;
    }
    
    @PostMapping("addUser")
    public void addUser (@RequestBody User user) {
//    	String hashPassword = passwordEncoder.encode(user.getPassword().trim());
//    	user.setPassword(hashPassword);
//    	user.setRole('ROLE_USER');
    	userDAO.save(user);
    }
    

}
