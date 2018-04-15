package com.mwroblewski.repository;

import com.mwroblewski.entity.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDAO extends CrudRepository<Message, Long> {
}
