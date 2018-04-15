package com.mwroblewski.api;

import com.mwroblewski.exception.*;
import com.mwroblewski.exception.Error;
import com.mwroblewski.entity.Attachments;
import com.mwroblewski.entity.Contract;
import com.mwroblewski.entity.Profile;
import com.mwroblewski.entity.User;
import com.mwroblewski.repository.ProfileDAO;
import com.mwroblewski.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.util.SerializationUtils;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.math.BigDecimal;
import java.security.Principal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class UpdateUserProfileController {

    @Autowired
    UserDAO userDAO;
    @Autowired
    ProfileDAO profileDAO;
    
//    @PostMapping("/logout2")
//    public void logout2(@AuthenticationPrincipal Principal principal) {
//    	User user = userDAO.findByUsername(principal.getName());
//    	user.setEnabled(false);
//    	userDAO.save(user);
//    }
    
//    @RequestMapping(value="/logout2", method = RequestMethod.GET)
//    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null){    
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return "redirect:/";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
//    }

    @PostMapping("/update/user")
    public void updateAccount(@AuthenticationPrincipal Principal principal, @RequestBody HashMap<String, Object> details){

        if(details.get("email") != null){
            if(profileDAO.findByEmail((String) details.get("email")) != profileDAO.findByUser(userDAO.findByUsername(principal.getName())))
                throw new EmailAlreadyExistsException((String) details.get("email"));
        }

        User user = userDAO.findByUsername(principal.getName());
        Profile profile = user.getProfile();

        details.forEach((k,v) ->{
            switch (k){
                case "username":
                    user.setUsername((String) v);
                    break;
                case "password":
                    user.setPassword((String) v);
                    break;
                case "name":
                    profile.setName((String) v);
                    break;
                case "surname":
                    profile.setSurname((String) v);
                    break;
                case "email":
                    profile.setEmail((String) v);
                    break;
                case "phone":
                    profile.setPhone((String) v);
                    break;
                case "address":
                    profile.setAddress((String) v);
                    break;
                case "born":
                    try {
                        DateFormat formatter = new SimpleDateFormat("yyyy.MM.dd");
                        Date born = formatter.parse((String) details.get("born"));
                        profile.setBorn(born);
                    } catch (ParseException e) {
                        throw new DateFormatException((String) details.get("born"));
                    }
                    break;
                case "contract":
                    for (Contract contract : Contract.values()) {
                        if (((String) details.get("contract")).equals(contract)) {
                            profile.setContract(contract);
                            break;
                        }
                    }
                    break;
                case "maxSalary":
                    profile.setMaxSalary((Integer) v);
                    break;
                case "minSalary":
                    profile.setMinSalary((Integer) v);
                    break;
//                case "photo":
//                	Attachments attachments = new Attachments();
//                	attachments.setPhoto(SerializationUtils.serialize(v));
//                	attachments.setContentType((String) details.get("contentType"));
//                	profile.setAttachments(attachments);
//                	break;
            }

        });
        user.setProfile(profile);
        userDAO.save(user);
    }


    @ExceptionHandler(UsernameAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Error usernameAlreadyExists(UsernameAlreadyExistsException e){
        return new Error("User with username: " + e.getParameters() + " already exists");
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Error emailAlreadyExists(EmailAlreadyExistsException e){
        return new Error("3");
    }

    @ExceptionHandler(DateFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error emailAlreadyExists(DateFormatException e){
        return new Error("Incorrect data format: " + e.getParameters() + " \"yyyy.MM.dd\"");
    }


}
