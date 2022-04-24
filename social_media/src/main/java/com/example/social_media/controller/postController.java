package com.example.social_media.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.social_media.model.account;
import com.example.social_media.model.post;
import com.example.social_media.repository.accountRepository;
import com.example.social_media.repository.postRepository;

//@ComponentScan(basePackages = {"com.demo"})
@RestController
public class postController 
{
	
	@Autowired
	private postRepository repository;
	@Autowired
	private accountRepository arepository;
	@CrossOrigin
	@PostMapping("/post")
	public Binary post(@RequestParam("user") String u,@RequestParam("caption") String cap ,@RequestParam("image") MultipartFile multipartFile) throws IOException
	{
		
//@RequestParam("caption_") String caption_,
	
    //This class can encapsulate itself
	post p = new post();
	String fileName = org.springframework.util.StringUtils.cleanPath(multipartFile.getOriginalFilename());
//    p.caption=fileName;  
//    post savedUser = repository.save(p);
//    String uploadDir = "user-photos/" + savedUser.getId();
//    multipartFile.
//        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
    p.caption=cap;
    p.image = new Binary(BsonBinarySubType.BINARY, multipartFile.getBytes());
    LocalDate myObj = LocalDate.now();
    p.date = myObj;
    p.user = u;
    p.likes = 0;
    p.likers =new ArrayList<String>();
    
    repository.insert(p);
//    photo = photoRepo.insert(photo); return photo.getId(); 
	return p.image;
	}
	
	
	
	
	@CrossOrigin
	@PostMapping("/display_post")
	public List <post> display_post(@RequestBody String a)
	{
		
		String[] re =  a.split("\"")[3].split(":");
		account follows = arepository.findById(re[0]).get();
		List <String> s = follows.following;
		List <post> returnPosts = new ArrayList<post>();
//		
		for (int i = 0; i < s.size(); i++) 
		{
			List <post> temp = repository.findByuser(s.get(i));
			System.out.println("user:"+s.get(i));
			for (int j = 0; j < (temp).size(); j++) 
			{
				returnPosts.add(temp.get(j));
				System.out.println("caption:");
				System.out.println(temp.get(j).caption);
			}
			
		}
		System.out.println(follows.id);
		Comparator<post> mapComparator = (post m1, post m2) -> m2.getDate().compareTo(m1.getDate());
		Collections.sort(returnPosts, mapComparator);
		
		return returnPosts;
	}
	
	
	
	@CrossOrigin
	@PostMapping("/like")
	public String like(@RequestBody String a)
	{
		
		String[] re =  a.split("\"")[3].split("=");
		
		
		post follows = repository.findById(re[1]).get();
		follows.likes++;
		follows.likers.add(re[0]);
		repository.save(follows);
	
		return "liked";
	}
	
	
	
	@CrossOrigin
	@PostMapping("/unlike")
	public String unlike(@RequestBody String a)
	{
		
		String[] re =  a.split("\"")[3].split("=");
		for (int i = 0; i < re.length; i++) 
		{
			System.out.println("now"+re[i]);
		}
		
		post follows = repository.findById(re[1]).get();
		follows.likes--;
		follows.likers.remove(re[0]);
		repository.save(follows);
	
		return "unliked";
	}
	
	@CrossOrigin
	@PostMapping("/mypost")
	public List <post>  mypost(@RequestBody String a)
	{
		
		String re =  a.split("\"")[3];		
		List <post> temp = repository.findByuser(re);
		Comparator<post> mapComparator = (post m1, post m2) -> m2.getDate().compareTo(m1.getDate());
		Collections.sort(temp, mapComparator);
		return temp;
	}
	
	@CrossOrigin
	@PostMapping("/delete_post")
	public String  delete_post(@RequestBody String a)
	{
		
		String[] re =  a.split("\"")[3].split("=");
		repository.deleteById(re[1]);
		return "deleted";
	}
	
	
	
	
}
