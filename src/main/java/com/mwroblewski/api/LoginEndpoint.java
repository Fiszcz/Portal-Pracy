package com.mwroblewski.api;

import java.math.BigDecimal;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mwroblewski.entity.Attachments;
import com.mwroblewski.entity.Contract;
import com.mwroblewski.entity.Profile;
import com.mwroblewski.entity.User;
import com.mwroblewski.exception.DateFormatException;
import com.mwroblewski.exception.EmailAlreadyExistsException;
import com.mwroblewski.exception.Error;
import com.mwroblewski.exception.NotAllMandatoryAttributesException;
import com.mwroblewski.exception.UsernameAlreadyExistsException;
import com.mwroblewski.repository.ProfileDAO;
import com.mwroblewski.repository.UserDAO;

@RestController
public class LoginEndpoint {
    
	private ProfileDAO profileDao;
    private UserDAO userDao;
    
    @Autowired
    public LoginEndpoint(ProfileDAO profileDao, UserDAO userDao) {
    	this.userDao = userDao;
    	this.profileDao = profileDao;
    }
    
    @PostMapping("api/registration")
    public void createNewAccount(@RequestBody HashMap<String, Object> details) throws ParseException {

        if(details.get("username") == null || details.get("password") == null)
            throw new NotAllMandatoryAttributesException();
        else if(userDao.findByUsername((String) details.get("username")) != null)
            throw new UsernameAlreadyExistsException((String) details.get("username"));
        else if(details.get("email") != null && profileDao.findByEmail((String) details.get("email")) != null)
            throw new EmailAlreadyExistsException((String) details.get("email"));

        User user = new User();
        user.setUsername((String) details.get("username"));
        user.setPassword((String) details.get("password"));
        user.setEnabled(true);
        user.setRole("ROLE_USER");

        Profile profile = new Profile();
        profile.setName((String) details.get("name"));
        profile.setSurname((String) details.get("surname"));
        profile.setEmail((String) details.get("email"));
        profile.setPhone((String) details.get("phone"));
        profile.setAddress((String) details.get("address"));

        if(details.get("born")!=null) {
        	try {
        		DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        		Date born = formatter.parse((String) details.get("born"));
        		profile.setBorn(born);
        	} catch (ParseException e) {
        		throw new DateFormatException((String) details.get("born"));
        	}
        }

        if(details.get("contract")!= null) {
        	for (Contract contract : Contract.values()) {
        		if (((String) details.get("contract")).equals(contract.toString())) {
        			profile.setContract(contract);
        			break;
        		}
        	}
        }

        if(details.get("minSalary")!=null)
        	profile.setMinSalary((Integer) details.get("minSalary"));

        profile.setExperiences((String) details.get("experiences"));
        profile.setAccomplishments((String) details.get("accomplishments"));
        profile.setInterests((String) details.get("interests"));
        profile.setEducation((String) details.get("education"));

        Map<String, Object> inAttachments = (HashMap<String, Object>) details.get("attachments");
        if (inAttachments != null) {
            Attachments attachments = new Attachments();
            attachments.setPhoto(((String) inAttachments.get("photo")).getBytes());
            profile.setAttachments(attachments);
        }
        profile.setUser(user);
        user.setProfile(profile);
        userDao.save(user);
    }


    @ExceptionHandler(NotAllMandatoryAttributesException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody Error notAllMandatoryAttributes(NotAllMandatoryAttributesException e){
        return new Error("Must to fill in all mandatory attributes");
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody Error usernameAlreadyExists(UsernameAlreadyExistsException e){
        return new Error("2");
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody Error emailAlreadyExists(EmailAlreadyExistsException e){
        return new Error("3");
    }

    @ExceptionHandler(DateFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody Error emailAlreadyExists(DateFormatException e){
        return new Error("Incorrect data format: " + e.getParameters() + " \"yyyy.MM.dd\"");
    }
}