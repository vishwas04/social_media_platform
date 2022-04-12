import React, {useState} from 'react';
import {SidebarContents} from './sidebarOptions';
import './sidebar.css';
import {Link} from 'react-router-dom';
import * as Icons from 'react-icons/io5';


function Sidebar() {

    // this.setState({user: this.props.location.state.name});
    console.log("side",this.props.location.state.name);
    const[sidebarState,setsidebar]=useState(false);
    const toggleSidebar=()=>setsidebar(!sidebarState);

    return(
    <div className='fullSidebar'>
        <div className ='bar'>
            <Link to='/deregister' className='topButtons' style={{ textDecoration: 'none' }}><Icons.IoChatbubblesSharp color='#fff'/>DEREGISTER</Link>
            <Link to='/aboutus' className='topButtons' style={{ textDecoration: 'none' }}><Icons.IoInformationCircle color='#fff'/>ABOUT US</Link>
            <Link to='/logout' className='topButtons' style={{ textDecoration: 'none',position: 'absolute', right: 20 }}><Icons.IoLogOutOutline color='#fff'/>Logout</Link>
        </div>
        
    </div>
    );
}

export default Sidebar;
