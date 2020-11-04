import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import "./searchPage.css";
import { Redirect } from "react-router-dom";
import CardView from "./Card";
import { useAuth0 } from "@auth0/auth0-react";


function SearchPage(props) {
  const [posts, setPost] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [sendPostData, setSendPostData] = useState("");

  const { user } = useAuth0();

  const getInfo = async () => {
    const res = await fetch("/get_data", { method: "GET" });
    const data = await res.json();
    setPost(data);
    setDataStatus(true);
  };

  useEffect(async () => {
    getInfo();
  }, []);

  function test() {
    for (let post of posts) {
      console.log(post.parkingFee);
    }
  }

  const goToPost = (event) => {
    const obj = posts.find((item) => item._id === event.target.name);
    setSendPostData(obj);
    localStorage.setItem("post-picked", JSON.stringify(obj)); /*storing data in Local and retreive in calendard*/
  };

  if (sendPostData !== "") {
    return (
      <Redirect to="/Calendar" />
    );
  }

  /*{posts.map(cardDetail)*/
  return (
    <Container>
      <input
        className="col-md-3 m-3 mt-5"
        type="text"
        placeholder="Search By Zip Code"
      />
      {dataStatus ? (
        <div className="grid ">
          {posts.map((t) => (
            <CardView
              parkingFee={t.parkingFee}
              street={t.street}
              name={t._id}
              function={goToPost}
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
      <p>{JSON.stringify(user, null, 2)}</p>
    </Container>
  );
}

export default SearchPage;
