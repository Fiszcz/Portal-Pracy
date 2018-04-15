package com.mwroblewski.repository;

import com.mwroblewski.entity.Category;
import com.mwroblewski.entity.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAO extends CrudRepository<Category, Long> {
}
