package com.mwroblewski.repository;

import com.mwroblewski.entity.Offer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferDAO extends CrudRepository<Offer, Long> {
    Offer findById(Long id);
}
