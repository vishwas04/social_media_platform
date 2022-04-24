package com.example.social_media.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.social_media.model.post;

public interface postRepository extends MongoRepository<post, String> 
{
	List<post> findByuser(String a);
} 