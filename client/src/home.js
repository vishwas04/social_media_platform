import './home.css';
import {Helmet} from "react-helmet";
import React, { Component } from "react";
import man1 from "/Users/vishwas/Desktop/social_media_client/client/src/images/man1.jpg";
import h1 from "/Users/vishwas/Desktop/social_media_client/client/src/images/h.png";
import { useLocation } from "react-router-dom";

// import s1 from "/Users/vishwas/Desktop/social_media_client/client/src/home1.js";
// import c1 from "./css/normalize.css";
// import c2 from "./css/demo.css";
// import c3 from "./css/component.css";
// import s3 from "./js/gnmenu.js";
//import s4 from "./js/new.js";
import Sidebar from './components/Sidebar';
import auth from './auth';
class Login extends Component
{
    constructor(props,context)
    {
      super(props,context);
      this.state=
      {
        user :null,
        x :"",
        b:"a+",
        r:"0",
        filess:null,
        file: "",
        xx:0,
      }
      this.setxRef=(el)=>{this.xinput=el}
      // this.setRef=(el)=>{this.myRef=el};
      this.handleImagePreview = this.handleImagePreview.bind(this);
      this.handleImagePreview1 = this.handleImagePreview1.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      this.handleserch = this.handleserch.bind(this);
      this.unfollowhandleserch = this.unfollowhandleserch.bind(this);
      
      
      // this.opt=this.opt.bind(this);
      // this.corona=this.corona.bind(this);
    }
    componentDidMount(){
      this.setState({user: this.props.location.state.name});
      const options = {
      method: 'POST',
      body:JSON.stringify({r:this.props.location.state.name})
    };
    
    fetch('http://localhost:8080/display_post', options)
    .then((responseJson) =>{return responseJson.json()})
    .then((r) =>
    {      
      const { match, location, history } = this.props;
      history.push("/home", { name: this.props.location.state.name});
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


        var like_button=document.createElement("button");
        like_button.className="round-button-circle";
        console.log(this.props.location.state.name in r[i].likers,r[i].likers)
        if( r[i].likers.includes(this.props.location.state.name ))
        {
              like_button.innerHTML="UNLIKE";
        }
        else
        {
            like_button.innerHTML="LIKE";
        }
        var s = this;
        like_button.onclick =(e) =>
        {
          // console.log(e.target.parentNode.id);
          // var i=Integer.parseInt("200"); 
          // var c = (((document.getElementById(e.target.parentNode.id+"likes_text")).innerHTML.split(":"))[1]).parseInt;
          var c =parseInt(document.getElementById(e.target.parentNode.id+"likes_text").innerHTML.split(":")[1]);
          var now  = e.target.innerHTML;
          
          if(now==="LIKE")
          {
              // var c = document.getElementById(e.target.parentNode.id+"likes_text").split(":");
              var u =document.getElementById("username").innerHTML.concat("=",e.target.parentNode.id);
              document.getElementById(e.target.parentNode.id+"likes_text").innerHTML="LIKE:"+(c+1).toString();
              e.target.innerHTML="UNLIKE";
              fetch('http://localhost:8080/like',
              {
                    method:'POST',
                    headers : {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                    },
                    body:JSON.stringify({ r : u})
              })
              .then(responseJson => responseJson.json())
              .then(data =>{ })
              .catch((error) => {
                console.log("error")
              });



          }
          else
          {
            var u =document.getElementById("username").innerHTML.concat("=",e.target.parentNode.id);
            document.getElementById(e.target.parentNode.id+"likes_text").innerHTML=" LIKE: "+(c-1).toString();
            e.target.innerHTML="LIKE";
            fetch('http://localhost:8080/unlike',
              {
                    method:'POST',
                    headers : {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                    },
                    body:JSON.stringify({r:u})
              })
              .then(responseJson => responseJson.json())
              .then(data =>{ })
              .catch((error) => {
                console.log("error")
              });
          }
          // document.getElementById(e.target.parentNode.id+"likes_text").innerHTML= " LIKES :"+;
        }
        
        div_post.appendChild(div_image);
        div_post.appendChild(cap);
        div_post.appendChild(likes_text);
        div_post.appendChild(like_button); 
        document.getElementById("display_post").appendChild(div_post);
      }
      console.log(r);
      
      // alert("posted")
    })
    .catch((error) => {
      console.log("error")
    });


    }
    handleserch(e)
    {
      const myNode = document.getElementById("follow_req");
      var loing_res = (this.state.user).concat("=",e.target.value)
        while (myNode.firstChild) 
        {
          // console.log(myNode.lastChild.id);
          
          myNode.removeChild(myNode.lastChild);
          
        }
      fetch('http://localhost:8080/search_request',
      {
            method:'POST',
            headers : {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
            },
            body:JSON.stringify({r:loing_res})
      })
      .then(responseJson => responseJson.json())
      .then(data =>{    
      if (e.target.value!="")
        {
          var names=[] ;
          var ids=[] ;
          
          for(var i=0;data[i];i++)
          {
            console.log(data[i].id in ids);
            if (!(data[i].id in ids))
            {
              names.push(data[i].name);
              ids.push(data[i].id);
            }
            
          }
          // document.getElementById("result").innerHTML="";
          for(var i=0;ids[i];i++)
          {
            var d =document.createElement("div");
            d.id=ids[i];
            d.style.cssText="border-style: solid ;border-color: green ;borderRadius:25px "
            var d_name =document.createElement("p");
            d_name.style.cssText="position:absoulte"
            var d_id =document.createElement("p");
            d_id.style.cssText="position:absoulte;"
            d_name.innerHTML = "NAME :" + names[i];
            d_id.innerHTML = "ID :" +ids[i];
            var follow_button = document.createElement('button');
            follow_button.id = "follow_button"+i.toString();
            follow_button.innerHTML="FOLLOW";

            follow_button.onclick  =(e) =>
            {
                // console.log(this.state.user,e.target.parentNode.id);
                var f = (this.state.user).concat("=",e.target.parentNode.id)
                const options = {
                method: 'POST',
                body:JSON.stringify({f1:f})
                };
                fetch('http://localhost:8080/follows', options)
                // .then((responseJson) =>{return responseJson.json()})
                .then((r) =>
                {
                    var del = document.getElementById(e.target.parentNode.id);
                    del.remove();
                    this.location.reload();
                })
              .catch((error) => {
                console.log("error")
              });

            }

            d.appendChild(d_name);
            d.appendChild(d_id);
            // d.appendChild(document.createElement("p"));
            d.appendChild(follow_button);
            
            var res = document.getElementById("follow_req");
            res.appendChild(d);

            // console.log(data[i][0].name);
            console.log(ids[i]);
            
          }
        }
      else
        {
          // document.getElementById("result").innerHTML="";
        }
      })
      .catch((error) => {
        console.log("error")
      });;
    }


    unfollowhandleserch(e)
    {
      const myNode = document.getElementById("unfollowfollow_req");
      var loing_res = (this.state.user).concat("=",e.target.value)
        while (myNode.firstChild) 
        {
          // console.log(myNode.lastChild.id);
          
          myNode.removeChild(myNode.lastChild);
          
        }
      fetch('http://localhost:8080/unfollowsearch_request',
      {
            method:'POST',
            headers : {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
            },
            body:JSON.stringify({r:loing_res})
      })
      .then(responseJson => responseJson.json())
      .then(data =>{    
      if (e.target.value!="")
        {
          var names=[] ;
          var ids=[] ;
          
          for(var i=0;data[i];i++)
          {
            console.log(data[i].id in ids);
            if (!(data[i].id in ids))
            {
              names.push(data[i].name);
              ids.push(data[i].id);
            }
            
          }
          // document.getElementById("result").innerHTML="";
          for(var i=0;ids[i];i++)
          {
            var d =document.createElement("div");
            d.id=ids[i];
            d.style.cssText="border-style: solid ;border-color: red ;borderRadius:25px"
            var d_name =document.createElement("p");
            d_name.style.cssText="position:absoulte"
            var d_id =document.createElement("p");
            d_id.style.cssText="position:absoulte;"
            d_name.innerHTML = "NAME :" + names[i];
            d_id.innerHTML = "ID :" +ids[i];
            var follow_button = document.createElement('button');
            follow_button.id = "unfollow_button"+i.toString();
            follow_button.innerHTML="UNFOLLOW";

            follow_button.onclick  =(e) =>
            {
                // console.log(this.state.user,e.target.parentNode.id);
                var f = (this.state.user).concat("=",e.target.parentNode.id)
                const options = {
                method: 'POST',
                body:JSON.stringify({f1:f})
                };
                fetch('http://localhost:8080/unfollows', options)
                // .then((responseJson) =>{return responseJson.json()})
                .then((r) =>
                {
                    var del = document.getElementById(e.target.parentNode.id);
                    del.remove();
                })
              .catch((error) => {
                console.log("error")
              });

            }

            d.appendChild(d_name);
            d.appendChild(d_id);
            // d.appendChild(document.createElement("p"));
            d.appendChild(follow_button);
            
            var res = document.getElementById("unfollowfollow_req");
            res.appendChild(d);

            // console.log(data[i][0].name);
            console.log(ids[i]);
            
          }
        }
      else
        {
          // document.getElementById("result").innerHTML="";
        }
      })
      .catch((error) => {
        console.log("error")
      });;
    }

    handleUpload()
    {
      const fileInput = document.getElementById('home_file') ;
      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      formData.append("user", this.props.location.state.name);
      formData.append("caption", (document.getElementById("home_caption")).value );
      const options = {
      method: 'POST',
      body: formData,
    };
    
    fetch('http://localhost:8080/post', options)
    .then((responseJson) =>{return responseJson.json()})
    .then((r) =>
    {
     
      // console.log(auth.isAuthenticated(),"dwdwdwd");
      
      const { match, location, history } = this.props;
      history.push("/home", { name: this.props.location.state.name});
      // var final_slide=document.createElement("img");
      // final_slide.src="data:image/png;base64;,".concat(r.data);
      // final_slide.style.cssText="position:absolute;width:700px;height:500px";

      // document.body.appendChild(final_slide);
      // console.log(final_slide);
      alert("posted")
    })
    .catch((error) => {
      console.log("error")
    });

    }

    handleImagePreview1(previewEvent) {
        
      this.setState({ filess: previewEvent.target.files }) 
  }
  handleImagePreview(previewEvent) {
      this.setState({ xx: this.state.xx + 1 })  
      if(this.state.filess!=null)
      {
          if(this.state.xx!==this.state.filess.length)
          {
              // this.myRef.innerHTML=this.state.filess[this.state.xx].name;
              this.setState({

                      file: URL.createObjectURL(this.state.filess[this.state.xx])
                  })
          }
          else
          {
              this.setState({xx: 0 }) ;
              // this.myRef.innerHTML=this.state.filess[0].name;
              this.setState({
                  file: URL.createObjectURL(this.state.filess[0])
              })
          }
      }
      else
      {
          alert("image upload plez")
      }
     
  }
    render(){
       
      return (<div>
        {/* <h1>{this.state.user_}</h1> */}
              
              
    
    <div style={{ height:"3000px" }} >
    <Sidebar/>
               
                <div id = "posting_div" style={{ position:'fixed',height:"50%",width:"25%",bottom:"0px",right:"0px", background : "linear-gradient(300deg,red,orangered 90%)",zIndex:"5",borderRadius: "25px",textalign: "center"}} >
                  <p id="username_wel" style={{textalign: "center"}}>WELCOME</p>
                  <p id="username">{this.props.location.state.name}</p>
                  <input id="home_file" type="file" className="button-78" accept="image/*" name="image" onChange={this.handleImagePreview1}  multiple/>
                  <input id="home_caption" className="button-78" name="caption" placeholder="caption" autocomplete="off"/>    
                  <button id="home_prev" type="button" className="button-78"  onClick={this.handleImagePreview}>Preview</button>
                  <button id="home_submit" type="button" className="button-78" onClick={this.handleUpload} >Upload</button>
                  <img id="home_img" className="button-62"  src={this.state.file} alt="Upload image -> Preview -> Upload" width="300" height="200"/>
                </div>
                <br></br>
                <div id ="display_post"  style={{position:'absolute', left:"30%",height:"3000px" ,width:"40%",background : "black"}}>

                </div>
                
                <div id="follow" style={{ tposition:"absolute",top:"15%" ,width:"15%"} } >
                  <input id="home_search" name="home_search_name" placeholder="FOLLOW" onChange={this.handleserch} autocomplete="off" />   
                  <div id="follow_req" style={{width:"100%"}}>
                  </div> 
                </div>

                
                <div id="unfollow" style={{position:"absolute", top:"10%",height:"300px"  , width:"15%" ,right:"0px"}} >
                  <input id="unfollowhome_search" name="home_search_name" placeholder="UNFOLLOW" onChange={this.unfollowhandleserch} autocomplete="off" />   
                  <div id="unfollowfollow_req" style={{width:"100%"}}>
                  </div> 
                </div>
              {/* <input id="home_input" type="text" onChange={this.call_search} autocomplete="off"/>
              <label id="lable_input" htmlFor="home_input"alt="FIND BLOOD DONOR" placeholder="FIND BLOOD DONOR"></label>
            
              <br/>
             <br/>
              
              <h3 id="htree">BLOOD GROUP</h3>
                    <select id="select_"value={this.state.b} onChange={this.opt}>
                        <option value = "a+">A+</option>
                        <option value = "a-">A-</option>
                        <option value = "b+">B+</option>
                        <option value = "b-">B-</option>
                          <option value = "o+">O+</option>
                          <option value = "o-">O-</option>
                          <option value = "ab+">AB+</option>
                          <option value = "ab-">AB-</option>
                    </select>
            <h3 id="hfour">CORONA RECOVERD</h3>
              <lable id="lable1">YES</lable><input id="i1"type="radio" name="r1" onChange={this.corona} value={1}/>
              <lable id="lable2">NO</lable><input id="i2" type="radio" name="r1" onChange={this.corona} value={0} />
            <div id="result" ></div> */}
    </div>


</div>
              );}
    
}

export default Login;
