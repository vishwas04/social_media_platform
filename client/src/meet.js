import React, { Component } from "react";
import Cookies from "js-cookie";
import auth from "./auth";
import { withRouter } from "react-router";
class Logout extends Component
{
    constructor(props)
    {
        super(props);
        const { match, location, history } = this.props;
        Cookies.remove("user");
        auth.logout(()=>{
            console.log("home");
            history.push("/");
          })
    }
    render ()
    {
        return( <div><h1>removed</h1></div>);
    }
}
export default Logout;
