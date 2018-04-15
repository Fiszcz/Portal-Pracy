package com.mwroblewski.repository;

import com.mwroblewski.entity.Offer;
import com.mwroblewski.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends CrudRepository<User, Long> {
    User findById(Long id);
    User findByUsername(String username);
	User findByOffers(Offer offer);
}
