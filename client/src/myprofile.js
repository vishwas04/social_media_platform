import './myprofile.css';
import React, { Component } from "react";
//import heart1 from '/Users/vishwas/Desktop/social_media_client/client/src/images/red1.jpg'
//import auth from "./auth"
//import { withRouter } from "react-router";

class Myprofile extends Component
{
    
    constructor(props,context)
        {
          super(props,context);
          this.state=
          {
            email: "",
            pass :"",
            user:""
          }
        }
    componentDidMount(){
          
      this.setState({user: this.props.location.state.name});
        
          var f = this.props.location.state.name;
          const options = {
            method: 'POST',
            body:JSON.stringify({f1:f})
            };
            fetch('http://localhost:8080/myprofile', options)
            .then(responseJson => responseJson.json())
      .then(data =>{    
          var c =0;
          for(var i=0;data[i];i++)
          {
            var d =document.createElement("div");
            d.style.cssText="border-style: solid ;border-color: green ;borderRadius:25px ;width:25%"
            var d_id =document.createElement("p");
            d_id.style.cssText="position:absoulte;"
            d_id.innerHTML = data[i];
            d.appendChild(d_id);
            var res = document.getElementById("myfollowers");
            res.appendChild(d);
            c++;
            console.log(data[i]);
          }
          document.getElementById("follow_count").innerHTML = "You are following "+c + " Accounts";
      })
      .catch((error) => {
        console.log("error")
      });;


      


      f = this.props.location.state.name;
      const options2 = {
            method: 'POST',
            body:JSON.stringify({f1:f})
            };
      fetch('http://localhost:8080/mypost', options2)
    .then((responseJson) =>{return responseJson.json()})
    .then((r) =>
    {      
      console.log(r);
      for (var i=0;r[i];i++)
      {
        console.log(r[i].user,this.props.location.state.name,r[i].user.toString()==this.props.location.state.name)
        console.log(r[i]);

        var div_post = document.createElement("div");
        div_post.id = r[i].id;
        div_post.style.cssText="border-style:solid;border-width: 5px; border-color:orangered ;borderRadius:25px"

        var div_image=document.createElement("img");
        div_image.id=r[i].id+"pic";
        div_image.src="data:image/png;base64;,".concat(r[i].image.data);
        div_image.style.cssText="left:10%;width:100%;";

        
        var cap = document.createElement("p");
        cap.id=r[i].id+"cap";
        cap.innerHTML=r[i].user+" : "+r[i].caption ;

        var likes_text = document.createElement("p");
        likes_text.id=r[i].id+"likes_text";
        likes_text.innerHTML="LIKES :"+ r[i].likes;


        var delete_button=document.createElement("button");
        delete_button.className="round-button-circle";
        console.log(this.props.location.state.name in r[i].likers,r[i].likers)
        
        delete_button.innerHTML="delete";
        
        delete_button.onclick =(e) =>
        {
          var c =parseInt(document.getElementById(e.target.parentNode.id+"likes_text").innerHTML.split(":")[1]);
          var now  = e.target.innerHTML;
          var u =this.props.location.state.name.concat("=",e.target.parentNode.id);
          fetch('http://localhost:8080/delete_post',
              {
                    method:'POST',
                    headers : {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                    },
                    body:JSON.stringify({ r : u})
              })
              .then(data =>{
                  console.log(e.target.parentNode.id+"delete");
                  document.getElementById("mypost").removeChild(e.target.parentNode);
               })
              .catch((error) => {
                console.log("error")
              });
        }
        
        div_post.appendChild(div_image);
        div_post.appendChild(cap);
        div_post.appendChild(likes_text);
        div_post.appendChild(delete_button); 
        document.getElementById("mypost").appendChild(div_post);
      }
      console.log(r);
      
      // alert("posted")
    })
    .catch((error) => {
      console.log("error")
    });

    
    
    }
    
                
    render(){
        
      return (
              
              
    <div className="full" >
      
          <h1>Myprofile</h1>
          <h1 id ="follow_count" style={{ position:"absolute",width:"50%"   }}></h1>
          <div id="myfollowers" style={{ position:"absolute",width:"50%" ,top:"30%"  }} ></div>

          <h1 id ="post_count" style={{position:"absolute",left:"60%" }}>Your posts</h1>
          <div id="mypost" style={{position:"absolute",left:"50%",top:"30%" ,height:"100%" , width:"40%"  }}></div>
    </div>

              );}
    
}

export default Myprofile;
