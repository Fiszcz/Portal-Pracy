package com.mwroblewski.repository;

import com.mwroblewski.entity.Entry;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryDAO extends CrudRepository<Entry, Long> {
	List<Entry> findAllByOffer(int id);
}
