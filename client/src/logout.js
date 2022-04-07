
import React, { Component } from "react";
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from "react-router-dom";
import {PrivateRoute} from "./protect"
import auth from "./auth"

class Logout extends Component
{
    constructor(props,context)
    {
        super(props,context);
        const { match, location, history } = this.props;
        auth.logout(()=>{
            console.log("home");
            history.push("/");
          })
    }


    render()
    {
        
        return(
               <div>loging OUT</div>
    
               
    );
    }
}

export default Logout;
