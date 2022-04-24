package com.example.social_media.model;
import org.bson.types.Binary;
import java.time.*;  
//import org.springframework.data.annotation.postID;

import java.time.LocalDate;
import java.util.*;

import org.springframework.data.annotation.Id;
//import org.springframework.data.annotation.postID;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString

@Document(collection = "post")
public class post 
{
	@Id
	public String id;
	public String caption;
	public Binary image;
	public String user;
	public LocalDate date ;
	public int likes;
	public List<String> likers;
	
	public LocalDate getDate() {
		return date;
	}
	
	
}
