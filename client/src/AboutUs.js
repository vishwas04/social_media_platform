import React from 'react';
import './AboutUs.css';

function Card({Name,ImageUrl,Details}) {
  return( 
    <div className='card-container'>
      <div className='image-container'>
        <img src={ImageUrl} alt=''/>
      </div>
         <div className='name'><h4>{Name}</h4></div>
      <div className='details'><p>{Details}</p></div>  
    </div>
  );
}

function AboutUs(){
  return(
  <div className='contactPage' style={{background : "orangered"}}>
    <br/>
    <p style={{margin:'0rem 1rem' ,fontSize:'1rem',color:"black"}}>
    Hi WELCOME To INTTER a Social Media Platform .
    You Can use this platform To FOLLOW an account to get their posts You can also LIKE those post .
    If you start Hating them then you can UNFOLLOW also.
    </p>
    <h2 style={{margin:'1rem'}}>Creators of this Website:</h2>

    <div className='allCards'>
      
      <Card Name='Vishwas R' ImageUrl='' Details='Student of PES University'/>
      <Card Name='Vishnu J G' ImageUrl='https://instagram.fblr15-1.fna.fbcdn.net/v/t51.2885-19/s320x320/121973628_655148618525865_2339876005249812615_n.jpg?_nc_ht=instagram.fblr15-1.fna.fbcdn.net&_nc_ohc=jdXWWsFpuZkAX8FSljt&tp=1&oh=424fe4b7c992b7b9a5aea65e2c8e10f9&oe=5FFB4325' Details='Student of PES University'/>
      <Card Name='Uthpal P' ImageUrl='https://instagram.fblr15-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117727395_930567077453692_2205420915145539385_n.jpg?_nc_ht=instagram.fblr15-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=9tU-GzNDqoAAX9VJvSD&tp=1&oh=37217ec91215eb759654befa70141d56&oe=5FFA10AE' Details='Student of PES University'/>
    </div>

  </div>)
}

export default AboutUs;

