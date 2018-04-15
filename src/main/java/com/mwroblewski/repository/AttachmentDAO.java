package com.mwroblewski.repository;

import com.mwroblewski.entity.Attachments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentDAO extends CrudRepository<Attachments, Long> {
	Attachments findById(Long id);
}
