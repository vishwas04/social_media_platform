
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
        console.log("home"+auth.isAuthenticated());
        auth.logout(()=>{
            console.log("home"+auth.isAuthenticated());
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
