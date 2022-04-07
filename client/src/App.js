
import React, { Component } from "react";
import Login from "./login.js"
import Home from "./home.js"
import Signup from "./signup.js"
import Deregister from "./deregister.js"
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from "react-router-dom";
import {PrivateRoute} from "./protect"
import Sidebar from './components/Sidebar';
import Images from "./image.js"
import Video from "./videos.js"
import Aboutus from "./AboutUs.js"
import Contactus from "./contact.js"
import Logout from "./logout.js";
import Cookies from "js-cookie";
import auth from "./auth";

class App extends Component
{
    
    render()
    {
        
        return(
               
    <Switch>
    <Route exact path="/" component={Login}/>
    <PrivateRoute exact path="/home" component={Home} />
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/deregister" component={Deregister}/>
    <PrivateRoute exact path="/images" component={Images}/>
    <PrivateRoute exact path="/vidoes" component={Video}/>
    <PrivateRoute exact path="/aboutus" component={Aboutus}/>
    <PrivateRoute exact path="/contact" component={Contactus}/>
    <Route exact path="/logout" component={Logout}/>
    </Switch>
               
               );
    }
}

export default App;
