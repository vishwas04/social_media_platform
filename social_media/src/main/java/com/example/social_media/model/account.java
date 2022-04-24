package com.example.social_media.model;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString

@Document(collection = "account")
public class account 
{
	@Id
	public String id ;
	public String name ;
	public String password ;
	public LocalDate join_date ;
	public String dob ;
//	public int is_private ;
	
	public List<String> following;  
	public List<String> followers;  
	
	
}


