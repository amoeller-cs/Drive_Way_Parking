import React, { useState, useEffect } from "react";
import CreatePost from "./components/CreatePost";
import SearchPage from "./components/SearchPage";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import logo from "./components/asset/garage.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import LoginBtn from "./components/LoginBtn";
/*import UserContext from "./components/UserContext";*/
import "bootstrap/dist/css/bootstrap.min.css";

export const UserContext = React.createContext({});


function App() {

  let history = useHistory() ;

  const [userInfo, setUserInfo] = useState({
    email : "",
    password:"",
    name:""
  })


   useEffect(()=>{
    const data=localStorage.getItem("current-user");
    if(data){
      setUserInfo(JSON.parse(data))
    }
  },[])


  useEffect(()=>{
    localStorage.setItem("current-user", JSON.stringify(userInfo))
  })


  const handleLogOutbtn=(event)=>{
      setUserInfo("")
      
      history.push("/LoginBtn")
      localStorage.clear();
  }


  
  return (
    <Router>
      <div className="App">
      
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="40"
              height="40"
              class="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand>Drive Way Sharing </Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href={userInfo === "" ? "" : "./home"}>
              {userInfo === "" ? "" : "Home"}
            </Nav.Link>
            <Nav.Link href={userInfo === "" ? "" : "./createpost"}>
              {userInfo === "" ? "" : "Create Post"}
            </Nav.Link>
            <Nav.Link href={userInfo === "" ? "" : "./searchpage"}>
              {userInfo === "" ? "" : "Search Post"}
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text >
              <Navbar.Brand>{userInfo===""? "": `hello : ${userInfo.name}`} </Navbar.Brand>
              <Button disabled={userInfo===""} display ={userInfo===""? "none":"" } onClick={handleLogOutbtn}>LOG OUT</Button>
             
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

       <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Switch>
            <Route path="/searchpage" component={SearchPage} />
            <Route path="/createpost" component={CreatePost} />
            <Route path="/home" component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/" component={LoginBtn} />
            <Route path="/App" component={App} />
            <App />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
