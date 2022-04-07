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
      this.setRef=(el)=>{this.myRef=el};
      this.handleImagePreview = this.handleImagePreview.bind(this);
      this.handleImagePreview1 = this.handleImagePreview1.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      // this.opt=this.opt.bind(this);
      // this.corona=this.corona.bind(this);
    }
    componentDidMount(){
      this.setState({user: this.props.location.state.name});
    }

    handleUpload()
    {
      const fileInput = document.getElementById('home_file') ;
      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      const options = {
      method: 'POST',
      body: formData,
    };
    
    fetch('http://localhost:8080/post', options)
    .then((responseJson) =>
    {
      console.log("error")
      console.log(auth.isAuthenticated,"dwdwdwd");
      
      const { match, location, history } = this.props;
      history.push("/home", { name: this.props.location.state.name});
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
              this.myRef.innerHTML=this.state.filess[this.state.xx].name;
              this.setState({

                      file: URL.createObjectURL(this.state.filess[this.state.xx])
                  })
          }
          else
          {
              this.setState({xx: 0 }) ;
              this.myRef.innerHTML=this.state.filess[0].name;
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
              
              
    
    <div style={{ height:"1350px" }} >
                
                <Sidebar/>
                  <h1 id="username">WELCOME</h1>
                  <h1 id="username">{this.props.location.state.name}</h1>
                  <input id="home_file" type="file" className="button-78" accept="image/*" name="image" onChange={this.handleImagePreview1}  multiple/>    
                  <h3   ref={this.setRef}></h3>
                  <button id="home_prev" type="button" className="button-78"  onClick={this.handleImagePreview}>Preview</button>
                  <button id="home_submit" type="button" className="button-78" onClick={this.handleUpload} >UPLddOAD</button>
                  <img id="home_img" className="button-62"  src={this.state.file} alt="Upload image -> Preview -> Build" width="500" height="600"/>
                  <img id="man1" src={man1} alt="p1"/>
                  <img id="man2" src={man1} alt="p2"/>
                  <img id="h1" src={h1} alt="p3"/>
              
            <img id="h2" src={h1} alt="p4"/>
                  <img id="h3" src={h1} alt="p5"/>
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
