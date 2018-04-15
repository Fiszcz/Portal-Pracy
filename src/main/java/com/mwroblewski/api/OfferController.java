package com.mwroblewski.api;

import com.mwroblewski.entity.*;
import com.mwroblewski.exception.InfoException;
import com.mwroblewski.exception.OfferNotExistsException;
import com.mwroblewski.repository.CategoryDAO;
import com.mwroblewski.repository.CityDAO;
import com.mwroblewski.repository.OfferDAO;
import com.mwroblewski.repository.UserDAO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/offer")
public class OfferController {

    @Autowired
    UserDAO userDAO;
    @Autowired
    OfferDAO offerDAO;
    @Autowired
    CategoryDAO categoryDAO;
    @Autowired
    CityDAO cityDAO;
    
    Logger logger = LoggerFactory.getLogger(OfferController.class);

    @GetMapping("/all")
    public List<Offer> getAllOffer(){

        return (List<Offer>) offerDAO.findAll();
    }

    @GetMapping("/user/all")
    public List<Offer> getUserOffer(@AuthenticationPrincipal Principal principal){

        User user = userDAO.findByUsername(principal.getName());
        return user.getOffers();
    }

    @GetMapping("/user")
    public Offer getUserOfferById(@AuthenticationPrincipal Principal principal, @RequestParam(name="id", required = true) Integer id){

        List<Offer> offerList = getUserOffer(principal);
        Optional<Offer> optional = offerList
                .stream()
                .filter(m -> m.getId() == id.longValue())
                .findFirst();

        if(optional.isPresent())
            return optional.get();
        else
            throw new OfferNotExistsException(id.toString());
    }

    @PostMapping("/add")
    public void addUserOffer(@AuthenticationPrincipal Principal principal, @RequestBody HashMap<String, S> inOffer) {

        User user = userDAO.findByUsername(principal.getName());
        Offer offer = new Offer();
        inOffer.forEach( (k,v) -> {
            switch (k){
                case "name":
                    offer.setName((String) inOffer.get(k));
                    break;
                case "description":
                    offer.setDescription((String) inOffer.get(k));
                    break;
                case "contract":
                    if(((String) v).equals(Contract.FULLTIME.toString()))
                        offer.setContract(Contract.FULLTIME);
                    else if(((String) v).equals(Contract.PARTTIME.toString()))
                        offer.setContract(Contract.PARTTIME);
                    else if(((String) v).equals(Contract.PRACTICE.toString()))
                        offer.setContract(Contract.PRACTICE);
                    break;
                case "maxSalary":
                    offer.setMaxSalary(((Integer) inOffer.get(k)));
                    break;
                case "minSalary":
                    offer.setMinSalary(((Integer) inOffer.get(k)));
                    break;
                case "company":
                    offer.setCompany(((String) inOffer.get(k)));
                    break;
                case "color":
                    offer.setColor(((Integer) inOffer.get(k)));
                    break;
                case "city":
                    //new city for every offer
//                    City city = new City((String) inOffer.get(k));
//                    cityDAO.save(city);

                    //table city as dictionary
                    List<City> cityList = (List<City>) cityDAO.findAll();
                    Optional<City> optional = cityList
                            .stream()
                            .filter(c -> c.getName().equals((String) v))
                            .findFirst();

                    if(optional.isPresent())
                        offer.setCity(optional.get());
                    else {
                    	City city = new City();
                    	city.setName((String) v);
                    	cityDAO.save(city);
                    	offer.setCity(cityDAO.findByName((String)v));
                    }

                    break;
                case "technology":
                    List<Map<String, String>> inListTechnology = (List<Map<String, String>>) v;
                    List<Category> categoryList = (List<Category>) categoryDAO.findAll();
                    List<Technology> technologyList = new ArrayList<>();

                    inListTechnology.forEach(l -> {
                        Technology technology = new Technology();
                        l.forEach((k1, v1) -> {
                            switch (k1){
                                case "category":
                                    Optional<Category> optional1 = categoryList
                                            .stream()
                                            .filter( v2 -> (v2.getName().equals(v1)))
                                            .findFirst();

                                    if(optional1.isPresent())
                                        technology.setCategory(optional1.get());
                                    else {
                                    	Category category = new Category();
                                    	category.setName(v1);
                                    	categoryDAO.save(category);
                                    	
                                    	List<Category> categoryList2 = (List<Category>) categoryDAO.findAll();
                                    	Optional<Category> optional2 = categoryList2
                                                .stream()
                                                .filter( v2 -> (v2.getName().equals(v1)))
                                                .findFirst();
                                    	technology.setCategory(optional2.get());
                                    }
                                    break;
                                case "level":
                                    if(v1.equals("FUNDAMENTAL"))
                                        technology.setLevel(Level.FUNDAMENTAL);
                                    else if(v1.equals("INTERMEDIATE"))
                                        technology.setLevel(Level.INTERMEDIATE);
                                    else if(v1.equals("ADVANCED"))
                                        technology.setLevel(Level.ADVANCED);
                                    break;
                            }
                        });
                        technology.setOffer(offer);
                        technologyList.add(technology);
                    });
                    offer.setTechnologies(technologyList);
                    break;
            }
        });
        offer.setPublished(new Date());
        offer.setUser(user);
        user.getOffers().add(offer);
        userDAO.save(user);
    }

    @PostMapping("/delete")
    public void deleteUserOfferById(@AuthenticationPrincipal Principal principal, @RequestBody Integer id){

        User user = userDAO.findByUsername(principal.getName());
        List<Offer> offerList = user.getOffers();

        Optional<Offer> optional = offerList
                .stream()
                .filter(o -> o.getId() == id.longValue())
                .findFirst();

        if (optional.isPresent()) {
            offerList.remove(optional.get());
            user.setOffers(offerList);
            userDAO.save(user);
            offerDAO.delete(id.longValue());
        }
        else throw new OfferNotExistsException(id.toString());
    }

    @PostMapping("/searchOffer")
    public List<Offer> searchOffer(@RequestBody Offer offer){
        List<Offer> tmpOffer = (List<Offer>) offerDAO.findAll();
        if(tmpOffer.size() == 0){
            logger.info("Brak ofert.");
            throw new InfoException("Brak ofert.");
        }

        if(offer.getId() != null)
            tmpOffer = tmpOffer.stream()
                    .filter(o -> o.getId() == offer.getId())
                    .collect(Collectors.toList());


        if(offer.getName() != null) {
            tmpOffer = tmpOffer.stream()
                    .filter( o -> o.getName().toUpperCase().contains(offer.getName().trim().toUpperCase()) || o.getDescription().toUpperCase().contains(offer.getName().trim().toUpperCase()))
                    .collect(Collectors.toList());
        }

        if(offer.getUser() != null)
            tmpOffer = tmpOffer.stream()
                    .filter(o -> o.getUser().getId() == offer.getUser().getId())
                    .collect(Collectors.toList());


        if(offer.getPublished() != null)
            tmpOffer = tmpOffer.stream()
                    .filter(o -> o.getPublished().compareTo(offer.getPublished()) != -1)
                    .collect(Collectors.toList());

        if(offer.getMaxSalary() != null)
            tmpOffer = tmpOffer.stream()
                    .filter( o -> o.getMaxSalary().compareTo(offer.getMaxSalary()) == 1)
                    .collect(Collectors.toList());

        if(offer.getMinSalary() != null)
            tmpOffer = tmpOffer.stream()
                    .filter( o -> o.getMinSalary().compareTo(offer.getMinSalary()) == -1)
                    .collect(Collectors.toList());

        if(offer.getContract() != null)
            tmpOffer = tmpOffer.stream()
                    .filter( o -> o.getContract().equals(offer.getContract()))
                    .collect(Collectors.toList());


        if(offer.getCity() != null)
            tmpOffer = tmpOffer.stream()
                    .filter( o -> (o.getCity()!=null && o.getCity().getName().toUpperCase().contains(offer.getCity().getName().trim().toUpperCase())))
                    .collect(Collectors.toList());

        if(tmpOffer.size() == 0){
            logger.info("Brak ofert.");
        }

        return tmpOffer;
    }


    @ExceptionHandler(OfferNotExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody Error offerNotExists(OfferNotExistsException e){
        return new Error("Offer with id: " + e.getParameters() + " not exists");
    }
}
