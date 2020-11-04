import React from "react";
import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Row, Input } from "react-bootstrap";
import logo from "./asset/garage.png";
import { Redirect } from "react-router-dom";
import "./LoginBt.css";
import {UserContext } from "../App";
import { useHistory } from "react-router-dom";
import Home from "./Home"

const LoginBtn = () => {



  const [userInfo, setUserInfo] = useState({
    email : "",
    password:"",
    name:""
  })

  const [loginStatus , setLoginStutus] = useState({
    inStatus: false,
    newUser:false,
    loginFail:false
  });

  let history = useHistory();

  const getInfo = async (userQuery) => {
    const res = await fetch("/get_user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userQuery),
    });
    const data = await res.json();
    return data;
  };

  const recordUser = async (userObj) => {
    const res = await fetch("/insert_user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const data = await res.json();
    console.log(data);
  };

  const checkUserExistDB =  async () => {
      

    const dbuser = await getInfo({ email: userInfo.email});

    /*if new user*/
    console.log(dbuser);
    if (dbuser.length === 0) {
       recordUser(userInfo);
       setLoginStutus({
        ...loginStatus,
        inStatus: true,
         newUser:true,
       })

        localStorage.setItem("current-user", JSON.stringify(userInfo))
        
    } else if
    /*user found in db and match password and email*/
      (dbuser[0].email===userInfo.email && dbuser[0].password===userInfo.password) {
        setLoginStutus({
          ...loginStatus,
        inStatus: true
        });

      localStorage.setItem("current-user", JSON.stringify(userInfo))
    }
    else{
      setLoginStutus({
        ...loginStatus,
        loginFail: true
      });
    }

      console.log(userInfo);
  };

  
  const handleChanges = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(()=>{
    const data=localStorage.getItem("current-user");
    if(data){
      setUserInfo(JSON.parse(data))
    }else{loginStatus.inStatus=false}
  },[])



return (loginStatus.inStatus? <Home />: (
      <div>
     <div className="mt-5 d-flex justify-content-center">
     <img src={logo} size width="180px" alt="logo" />
     </div>
    <div className="mt-3 d-flex justify-content-center">
    <h3 >Parking Sharing App</h3>
   </div>
   <div className="mt-3 d-flex justify-content-center">
      <input  name="name" placeholder="Name" onChange={handleChanges}/> <br />
      </div>
    <div className="mt-3 d-flex justify-content-center">
      <input name ="email" placeholder="Email" onChange={handleChanges} /> <br />
      </div>
      <div className="mt-3 d-flex justify-content-center">
      <input name="password" placeholder="Password" onChange={handleChanges}/>
    </div>
     <div className="mt-3 d-flex justify-content-center">
      <Button className ="mt-3" onClick={() => {checkUserExistDB()}}>Log In </Button>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <p>{loginStatus.loginFail? "Please enter correct password":""}</p>
      </div>
   
  </div>
))
};

export default LoginBtn;
