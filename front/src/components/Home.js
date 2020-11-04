import React, { useState, useEffect } from "react";
import CardView from"./Card"
import { Card, Button, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
/*import UserContext from "./UserContext";*/
import LoginBtn from  "./LoginBtn"


function Home(props) {

  const [userInfo, setUserInfo] = useState({
    email : "",
    password:"",
    name:""
  })


  const [userActivePost, setUserActivePost] = useState("");

  const [dataStatus, setDataStatus] = useState(false);

  const query={email:userInfo.email}

  const getInfo = async () => {
    
    const res = await fetch("/get_data_query", {
      method: "post",
      headers: {
     'Content-Type': 'application/json',},
      body: JSON.stringify({email:userInfo.email}),
    });
    const data = await res.json();
    await setUserActivePost(data);
    setDataStatus(true)
    //console.log(userActivePost);

    
  };
/*{email:userInfo.email}*/


   useEffect( ()=>{
     const data=localStorage.getItem("current-user");
    if(data){
      setUserInfo(JSON.parse(data))
    }
  },[])



  useEffect(() => {
   try {
      // statements
      getInfo();
    } catch(e) {
      // statements
      
    } 

  });




  return (
    <Container >
      <h2>
        <u>Active Post</u></h2>
        {dataStatus ? (
        <div className="grid ">{userActivePost.map(t=> <CardView parkingFee={t.parkingFee} street={t.street} _id={t._id} function=""/>)}</div>
      ) : (
        <h1>Loading</h1>
      )}

    </Container>
  );
}

      
   



export default Home;
