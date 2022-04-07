import './App.css';
import React, { Component } from "react";
import heart1 from '/Users/vishwas/Desktop/social_media_client/client/src/images/red1.jpg'
import auth from "./auth"
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
            
          fetch('http://localhost:8000/login',{
            method:'POST',
            headers : {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
            },
            body:JSON.stringify({
                                email:this.einput.value,
                                pass1:this.pinput.value})
          })
            .then((responseJson) => {
                  if(responseJson.status==200){
//                        window.location.href ="http://localhost:3000/home"
                  auth.login(()=>{
                             this.props.history.push ="/home"
                             })
                  }
                  else alert("LOGIN FAILED");
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
              
              
    <div className="full" >
            <img src={heart1} />
          <br/><br/>
        <div className="absolute">
          <h1>LOGIN</h1>
              <div  >
                  <lable>EMAIL</lable>  <input type="email" name="email" ref={this.seteRef}/>
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

export default Login;
