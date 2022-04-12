import './App.css';
import React, { Component } from "react";
import heart1 from '/Users/vishwas/Desktop/social_media_client/client/src/logo_twitter.png'
import auth from "./auth"
import { withRouter } from "react-router";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
class Login extends Component
{
    
    constructor(props,context)
        {
          super(props,context);
          this.state=
          {
            email: "",
            pass :""
          }
          this.seteRef=(el)=>{this.einput=el}
          this.setpRef=(el)=>{this.pinput=el}
          this.submit_fun=this.submit_fun.bind(this);
          const { match, location, history } = this.props;
        
            // const user= Cookies.get("user");
            // console.log("home");
            // if (user)
            // {
            //     auth.login(()=>{
            //         console.log("home");
            //         history.push("/home");
            //       })
            // }
            // else
            // {
              history.push("/");
            // }
      
        }
//        componentDidMount(){
//            fetch('http://localhost:8000/login',{
//                method:'GET',
//                headers:{'Accept':'application/json'},
//            })
//
//            .then((res)=>res.json())
//            .then((res)=>this.setState({items:res}))

        
        
    
//        }
        submit_fun(e)
        {
          var loing_res = (this.einput.value).concat("=",this.pinput.value)
          fetch('http://localhost:8080/login',{
            method:'POST',
            headers : {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
            },

            body:JSON.stringify({email:loing_res})
          })
          // .then((responseJson) =>{console.log(responseJson)})
          .then((responseJson) => {
            if(responseJson.status==200)
          {
          // console.log(response);
          // if(response === "1")
          // {
              // var data =response._id.toString();
              // console.log(data);
//            auth.demo();
              const { match, location, history } = this.props;
//            window.location.href ="http://localhost:3000/home";
              auth.login(()=>{
                              //  Cookies.set("user","loginTrue");
//                             window.location.href ="http://localhost:3000/home"
                            //  history.push("/home");
                             history.push("/home", { name: this.einput.value});
//                             console.log(history)
                             })
//                  auth.demo();
          // }
                            }  
            else alert("Login Failed") ;
            })
            .catch((error) => {
              console.log("error")
            });
          
        }
    submit_fun1(e){
        window.location.href ="http://localhost:3000/signup"
                }
    render(){
        
      return (
              
              
    <div  className="full" >
            <img style={{position:"fixed", top:"40%",left:"20px" ,width:"50%"}} id="login_img" src={heart1} />
          <br/><br/>
        <div className="absolute">
          <h1>LOGIN</h1>
              <div  >
                  <lable>USER_ID</lable>  <input type="email" name="email" ref={this.seteRef}/>
                  <br/>
                  <br/>
                  <lable>PASSWORD</lable>  <input type="password" name="pass1" ref={this.setpRef}/>
                  <br/>
                  <br/>
                  
              <button type="sumbit" value={0} onClick={this.submit_fun}>CONFIRM</button>
                  
              </div>
        </div>
        <div className="absolute1">
              <h2>NEW USER</h2>
              <div>
              <button type="sumbit" value={0} onClick={this.submit_fun1}>SIGN UP</button>
              </div >
        </div>
    </div>

              );}
    
}

export default withRouter(Login);
