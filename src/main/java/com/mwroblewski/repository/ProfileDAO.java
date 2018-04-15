package com.mwroblewski.repository;

import com.mwroblewski.entity.Profile;
import com.mwroblewski.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileDAO extends CrudRepository<Profile, Long> {
    Profile findById(Long id);
    Profile findByName(String name);
    Profile findBySurname(String surname);
    Profile findByEmail(String email);
    Profile findByUser(User user);
}
