package com.example.social_media.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.social_media.model.account;

public interface accountRepository extends MongoRepository<account, String> 
{
	List<account> IdRegex(String name_);

}
