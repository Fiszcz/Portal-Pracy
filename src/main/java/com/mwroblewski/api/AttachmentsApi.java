package com.mwroblewski.api;

import com.mwroblewski.entity.Attachments;
import com.mwroblewski.entity.Offer;
import com.mwroblewski.entity.Profile;

import com.mwroblewski.entity.User;
import com.mwroblewski.repository.AttachmentDAO;
import com.mwroblewski.repository.OfferDAO;
import com.mwroblewski.repository.ProfileDAO;
import com.mwroblewski.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/attachment")
public class AttachmentsApi {
	
	@Autowired
	AttachmentDAO attachmentDAO;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	ProfileDAO profileDAO;
	
	@Autowired
	OfferDAO offerDAO;
	
	@RequestMapping(value="/offer/{id}", method=RequestMethod.GET)
	public void getItemImageByOffer(@PathVariable Long id, HttpServletResponse response) throws IOException
	{
	   Offer offer = offerDAO.findById(id);
	   User user = userDAO.findByOffers(offer);
	   Profile profile = user.getProfile();
	   Attachments file = profile.getAttachments();
	   //Attachments file = attachmentDAO.findById(id);
	   response.setContentType(file.getContentType());
	   response.getOutputStream().write(file.getPhoto());

	   // don't close the output stream from the response
	}
	
	@RequestMapping(value="/profile/{id}", method=RequestMethod.GET)
	public void getItemImageByProfile(@PathVariable Long id, HttpServletResponse response) throws IOException
	{
	   Profile profile = profileDAO.findById(id);
	   Attachments file = profile.getAttachments();
	   //Attachments file = attachmentDAO.findById(id);
	   response.setContentType(file.getContentType());
	   response.getOutputStream().write(file.getPhoto());

	   // don't close the output stream from the response
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public void getItemImage(@PathVariable Long id, HttpServletResponse response) throws IOException
	{
	   Attachments file = attachmentDAO.findById(id);
	   response.setContentType(file.getContentType());
	   response.getOutputStream().write(file.getPhoto());

	   // don't close the output stream from the response
	}
	
	@PostMapping(value="/add")
	public void attachmentAdd(@AuthenticationPrincipal Principal principal,@RequestBody Attachments attachment) {
		Profile profile= userDAO.findByUsername(principal.getName()).getProfile();
		profile.setAttachments(attachment);
		profileDAO.save(profile); 
	}
}