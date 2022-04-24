package com.example.social_media.controller;

import java.io.IOException;
import java.lang.StackWalker.Option;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.management.Query;
import com.example.social_media.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
//import org.apache.tomcat.util.json.JSONParser;
//import org.bson.json.JsonObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.social_media.model.account;
import com.example.social_media.repository.accountRepository;
import com.example.social_media.repository.postRepository;

import org.json.JSONObject;
import org.apache.tomcat.util.buf.StringUtils;
import org.json.HTTP;
import org.json.JSONException;

@RestController
public class accountController  
{
	@Autowired
	private accountRepository repository;
	
	@RequestMapping(value="/controller", method=RequestMethod.GET)
	@ResponseBody
	public String foo() {
		return repository.findAll().toString();
	}
	
	
	@CrossOrigin
	@PostMapping("/createAccount")
	public String createAccount(@RequestBody String a)
	{
//		public String id ;
//		public String name ;
//		public String password ;
//		public LocalDate join_date ;
//		public String dob ;
		
		
		String[] re =  a.split("\"")[3].split("=");
		LocalDate myObj = LocalDate.now(); // Create a date object
	    System.out.println(myObj);
		account newaccAccount = new account();
		newaccAccount.id = re[0];
		newaccAccount.dob =re[1];
		newaccAccount.name = re[2];
		newaccAccount.password = re[3];
		newaccAccount.join_date = myObj;
		newaccAccount.following = new ArrayList<String>();  
		newaccAccount.join_date = myObj;
		repository.insert(newaccAccount);

		return a;
	}
	
	
	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody String a)
	{
		
//		public String id ;
//		public String name ;
//		public String password ;
//		public LocalDate join_date ;
//		public String dob ;
		
//		System.out.println(a);
		
		String[] re =  a.split("\"")[3].split("=");
		System.out.println(re[0]);
		System.out.println(re[1]);
//		LocalDate myObj = LocalDate.now(); // Create a date object
//	    System.out.println(myObj);
		account newaccAccount = new account();
		newaccAccount.id = re[0];
		newaccAccount.password = re[1];
		
		Optional<account> f = repository.findById(re[0]);
		if(f!=null && f.get().password.equals(re[1]))
		{
			return new ResponseEntity<account>(HttpStatus.OK);
		}
		return new ResponseEntity<account>(HttpStatus.BAD_REQUEST);

	}
	
	@CrossOrigin
	@PostMapping("/search_request")
	@ResponseBody
	public List<account> search_request(@RequestBody String a)
	{
		
//		Query query = new Query();
//		query.addCriteria(Criteria.where("name").regex("c$"));
//		List<account> users = repository.find(query, account.class);
//		account a = new account();
		
		String[] re =  a.split("\"")[3].split("=");
		if(re.length < 2)
			return null;
		System.out.println(re[0]);
		System.out.println(re[1]);
//		System.out.println(repository.IdRegex(re[0]).size());
		List <String> follows = (repository.findById(re[0]).get()).following;
		List <account> follows_res = repository.IdRegex(re[1]);
		List <account> follows_return = new ArrayList<account>();
//		if(follows==null)
//			return null;
		if(follows_res.size() >=1 )
		{
//			for (int i = 0; i < follows_res.size(); i++) 
//			{
//				System.out.println("rex match "+follows_res.get(i).id);
//			}
//			
//			for (int i = 0; i < follows.size(); i++) 
//			{
//				System.out.println("follows "+follows.get(i));
//			}
			for (int i = 0; i < follows_res.size(); i++) 
			{
				int not_follows =1 ;
				if(follows!=null)
				{
				for (int j = 0; j < follows.size(); j++) 
				{
					System.out.println(follows_res.get(i).id + follows.get(j) +(follows_res.get(i).id).equals(follows.get(j)));
					if((follows_res.get(i).id).equals(follows.get(j)))
					{
						not_follows =0;
					}
				}
				}
				if(not_follows==1)
				{
//					System.out.println("remove "+follows_res.get(i).id);
					follows_return.add(follows_res.get(i));
				}
			}
			return follows_return;
		}
		return null;
		
	}
	
	
	@CrossOrigin
	@PostMapping("/unfollowsearch_request")
	@ResponseBody
	public List<account> unfollowsearch_request(@RequestBody String a)
	{			
		String[] re =  a.split("\"")[3].split("=");
		if(re.length < 2)
			return null;
		System.out.println(re[0]);
		System.out.println(re[1]);
		List <String> follows = (repository.findById(re[0]).get()).following;
		List <account> follows_res = repository.IdRegex(re[1]);
		List <account> follows_return = new ArrayList<account>();

		if(follows_res.size() >=1 )
		{

			for (int i = 0; i < follows_res.size(); i++) 
			{
				if(follows!=null)
				{
				for (int j = 0; j < follows.size(); j++) 
				{
					if((follows_res.get(i).id).equals(follows.get(j)) )
					{
						follows_return.add(follows_res.get(i));
						break;
					}
				}
				}
				
			}
			return follows_return;
		}
		return null;
		
	}
	
	
	
	
	@CrossOrigin
	@PostMapping("/follows")
	@ResponseBody
	public String follows(@RequestBody String a)
	{

		String[] re =  a.split("\"")[3].split("=");
		System.out.println(re[0]);
		System.out.println(re[1]);
		Optional<account> f = repository.findById(re[0]);
		
		account newaccAccount = new account();
		newaccAccount.id = f.get().id;
		newaccAccount.dob =f.get().dob;
		newaccAccount.name = f.get().name;
		newaccAccount.password = f.get().password;
		newaccAccount.join_date = f.get().join_date;
		newaccAccount.following=f.get().following;
		
		if((f.get().following.indexOf(re[1])) == -1)
			newaccAccount.following.add(re[1]);
		repository.save(newaccAccount);

		return "saved";
	}
	
	@CrossOrigin
	@PostMapping("/unfollows")
	@ResponseBody
	public String unfollows(@RequestBody String a)
	{

		String[] re =  a.split("\"")[3].split("=");
		System.out.println(re[0]);
		System.out.println(re[1]);
		Optional<account> f = repository.findById(re[0]);
		
		account newaccAccount = new account();
		newaccAccount.id = f.get().id;
		newaccAccount.dob =f.get().dob;
		newaccAccount.name = f.get().name;
		newaccAccount.password = f.get().password;
		newaccAccount.join_date = f.get().join_date;
		newaccAccount.following=f.get().following;
		
		if((f.get().following.indexOf(re[1])) != -1)
			newaccAccount.following.remove(re[1]);
		repository.save(newaccAccount);

		return "saved";
	}
	
//	@GetMapping("/Accounts/{id}")
//	public Optional<account> Accounts(@PathVariable String id)
//	{
////		repository.findAll();
//		return repository.findById(id);
//	}
	
//	@DeleteMapping("/deleteAccount/{id}")
//	public String deleteAccount(@PathVariable String id)
//	{
//		repository.deleteById(id);
//		return "deleted";
//	}

	@CrossOrigin
	@PostMapping("/myprofile")
	@ResponseBody
	public List<String> myprofile(@RequestBody String a)
	{

		String re =  a.split("\"")[3];
//		System.out.println("a"+a);
		List <String> follows = (repository.findById(re).get()).following;
		


		return follows;
	}
	
	
}
