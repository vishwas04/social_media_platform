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
      This Website was created in the year 2020 to help patients suffering from Covid-19 by connecting them with Covid-recovered people interested Donating Plasma and Blood for treatments.<br/>
      The Covid-19 recovered patients interested in donating plasma for Plasma therapy can register through this website and provide their details through which they can be reached to.<br/>
      Any Suggestions regarding this Website can be mailed to <strong><i>plasmadonors_pesu@gmail.com</i></strong>
    </p>
    <h2 style={{margin:'1rem'}}>Creators of this Website:</h2>

    <div className='allCards'>
      <Card Name='Vishwas R' ImageUrl='https://pbs.twimg.com/profile_images/1230891857334304768/PMSyuIRm_400x400.jpg' Details='Student of PES University'/>
      <Card Name='Uthpal P' ImageUrl='https://instagram.fblr15-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117727395_930567077453692_2205420915145539385_n.jpg?_nc_ht=instagram.fblr15-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=9tU-GzNDqoAAX9VJvSD&tp=1&oh=37217ec91215eb759654befa70141d56&oe=5FFA10AE' Details='Student of PES University'/>
      <Card Name='Vireesh R Kadole' ImageUrl='https://instagram.fblr15-1.fna.fbcdn.net/v/t51.2885-19/s320x320/121973628_655148618525865_2339876005249812615_n.jpg?_nc_ht=instagram.fblr15-1.fna.fbcdn.net&_nc_ohc=jdXWWsFpuZkAX8FSljt&tp=1&oh=424fe4b7c992b7b9a5aea65e2c8e10f9&oe=5FFB4325' Details='Student of PES University'/>
      <Card Name='Tejas Vasishta' ImageUrl='https://scontent.fblr15-1.fna.fbcdn.net/v/t1.0-9/129660868_106833217960868_5105286495753399458_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=yINWMb4zTXcAX-oHJXy&_nc_ht=scontent.fblr15-1.fna&oh=df2b2cef1acd8e7b6879d7700124faaa&oe=5FF5D478' Details='Student of PES University'/>
    </div>

  </div>)
}

export default AboutUs;

