package com.mwroblewski.repository;

import com.mwroblewski.entity.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityDAO extends CrudRepository<City, Long> {
    City findByName(String name);
}
